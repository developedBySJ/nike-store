import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'

import {JwtPayload} from 'src/auth/types'
import {AuthService} from 'src/auth/auth.service'
import {Cloudinary} from 'src/lib/api/cloudinary'
import {SortMemberBy} from 'src/member/member.input'
import {Member, MemberDoc} from 'src/member/member.entity'
import {CLOUDINARY_API} from 'src/config/cloudinary.config'
import {Review, ReviewDoc} from 'src/review/review.enitity'
import {IMemberFilter, IUpdateMemberData} from 'src/member/member.type'

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name) private members: Model<MemberDoc>,
    @InjectModel(Review.name) private reviews: Model<ReviewDoc>,
    private authService: AuthService,
  ) {}

  async getAll({limit, page, sortBy}: IMemberFilter) {
    const skip = (page - 1) * limit
    const query = this.members.find({}).limit(limit).skip(skip)

    switch (sortBy) {
      case SortMemberBy.ASC_NAME:
        query.sort({firstName: 1})
        break
      case SortMemberBy.DESC_NAME:
        query.sort({firstName: -1})
        break
      case SortMemberBy.ROLE:
        query.sort({isAdmin: 1})
        break

      default:
        break
    }

    const res = await query

    if (!res.length) {
      throw new NotFoundException('no member found')
    }

    return res
  }

  async getById(id: string) {
    const res = await this.members.findById(id)
    if (!res) {
      throw new NotFoundException(`member not found with id "${id}"`)
    }

    return {
      ...res.toObject({
        transform: (doc, ret) => {
          ret.id = doc._id
        },
      }),
    }
  }

  async getByEmail(email: string) {
    const res = await this.members.findOne({email})

    if (!res) {
      throw new NotFoundException(`member not found with email "${email}"`)
    }

    return res
  }

  async deleteMember(id: string) {
    const res = await this.members.findByIdAndDelete(id)

    if (!res) {
      throw new NotFoundException(`member not found with id "${id}"`)
    }

    return res
  }

  async updateMember(id: string, data: IUpdateMemberData, viewer: JwtPayload) {
    const res = await this.members.findById(id)

    if (!res) {
      throw new NotFoundException(`member not found with id "${id}"`)
    }

    if (String(viewer.id) === String(res._id) || viewer.isAdmin) {
      const {
        address,
        avatar,
        currPassword,
        newPassword,
        dateOfBirth,
        firstName,
        isAdmin,
        lastName,
      } = data

      let password: string | undefined

      if (currPassword && newPassword) {
        const isCorrectPassword = await this.authService.isCorrectPassword(
          currPassword,
          res.password,
        )

        if (!isCorrectPassword) {
          throw new UnauthorizedException('wrong password')
        }

        password = await this.authService.hashPassword(newPassword)
      }

      let avatarUrl: string | undefined

      if (avatar) {
        if (Array.isArray(avatar)) {
          const imgArr = await avatar[0].promise
          avatarUrl = (
            await Cloudinary.upload(imgArr, CLOUDINARY_API.folder.members)
          ).secure_url
        } else {
          avatarUrl = (
            await Cloudinary.upload(avatar.file, CLOUDINARY_API.folder.members)
          ).secure_url
        }
      }

      let updateObj = {
        address,
        avatar: avatarUrl,
        password,
        dateOfBirth: dateOfBirth && new Date(dateOfBirth),
        firstName,
        isAdmin: viewer.isAdmin ? isAdmin : res.isAdmin,
        lastName,
      }

      Object.keys(updateObj).forEach((key: string): void => {
        updateObj[key] === undefined && delete updateObj[key]
      })

      res.set(updateObj)

      if (res.isModified('firstName lastName avatar')) {
        await this.reviews.updateMany(
          {'member.id': res._id},
          {
            $set: {
              'member.firstName': res.firstName,
              'member.lastName': res.lastName,
              ...(res.avatar && {'member.avatar': res.avatar}),
            },
          },
        )
      }

      await res.save()

      return res
    }

    throw new ForbiddenException()
  }
}
