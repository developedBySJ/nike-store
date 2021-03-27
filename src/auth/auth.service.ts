import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import * as mongoose from 'mongoose'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'

import { JwtPayload } from 'src/auth/types'
import { Cart, CartDoc } from 'src/cart/cart.entity'
import { LoginDto, SignUpDto } from 'src/auth/auth.dto'
import { Member, MemberDoc } from 'src/member/member.entity'
import { Favourite, FavouriteDoc } from 'src/favourite/favourite.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Member.name) private members: Model<MemberDoc>,
    @InjectModel(Cart.name) private carts: Model<CartDoc>,
    @InjectModel(Favourite.name) private favourite: Model<FavouriteDoc>,
    private jwt: JwtService
  ) { }

  async signUp({ dateOfBirth, email, firstName, lastName, password }: SignUpDto) {

    const isOldUser = await this.members.findOne({ email })

    if (isOldUser) { throw new ConflictException("email already exists") }

    const hashedPassword = await this.hashPassword(password)

    const _id = mongoose.Types.ObjectId()

    const newUser = await this.members.create({
      _id,
      email,
      password: hashedPassword,
      dateOfBirth,
      firstName,
      lastName,
      isAdmin: false,
    })

    await this.carts.create({ memberId: _id, products: [] })
    await this.favourite.create({ memberId: _id, products: [] })

    const token = this.signToken(newUser)

    return { user: newUser, token }

  }

  async login(loginDto: LoginDto) {

    const { email, password } = loginDto

    const user = await this.members.findOne({ email })

    if (!user) { throw new UnauthorizedException("invalid email or password") }

    const isAuthrized = await this.isCorrectPassword(password, user.password)

    if (!isAuthrized) { throw new UnauthorizedException("invalid email or password") }

    const token = this.signToken(user)

    return { user, token }

  }

  async hashPassword(password: string): Promise<string> {

    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword

  }

  async isCorrectPassword(password: string, hashedPassword: string): Promise<boolean> {

    const res = await bcrypt.compare(password, hashedPassword)

    return res

  }

  private signToken(user: MemberDoc) {

    const payload: JwtPayload = {
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin
    }

    return this.jwt.sign(payload)

  }

}