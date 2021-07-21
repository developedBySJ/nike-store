import {JwtService} from '@nestjs/jwt'
import {isValidObjectId} from 'mongoose'
import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  UseGuards,
} from '@nestjs/common'
import {
  Args,
  Resolver,
  Query,
  ID,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql'

import {JwtPayload} from 'src/auth/types'
import {Viewer} from 'src/auth/auth.model'
import {CartType} from 'src/cart/cart.model'
import {CartService} from 'src/cart/cart.service'
import {MemberType} from 'src/member/member.model'
import {MemberFilterDto} from 'src/member/member.dto'
import {MemberService} from 'src/member/member.service'
import {AdminOnly} from 'src/auth/guards/admin-only.guard'
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard'
import {FavouriteType} from 'src/favourite/favourite.model'
import {FavouriteService} from 'src/favourite/favourite.service'
import {MemberFilter, UpdateMemberInput} from 'src/member/member.input'
import {
  CurrentUser,
  CurrentUserCookie,
} from 'src/lib/decorators/CurrentUser.decorator'

@Resolver(() => MemberType)
export class MemberResolver {
  constructor(
    @Inject(forwardRef(() => JwtService)) private jwtService: JwtService,
    @Inject(forwardRef(() => MemberService))
    private memberService: MemberService,
    @Inject(forwardRef(() => CartService)) private cartService: CartService,
    @Inject(forwardRef(() => FavouriteService))
    private favouriteService: FavouriteService,
  ) {}

  @Query((returns) => [MemberType])
  @UseGuards(AdminOnly)
  @UseGuards(JwtAuthGuard)
  async getMembers(
    @Args({name: 'MemberFilter', type: () => MemberFilter})
    memberFilter: MemberFilterDto,
  ) {
    return this.memberService.getAll(memberFilter)
  }

  @Query((returns) => MemberType)
  @UseGuards(JwtAuthGuard)
  async getMemberById(
    @Args({name: 'id', type: () => ID}) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('invalid member id')
    }

    if (id === user.id || user.isAdmin) {
      return this.memberService.getById(id)
    }

    throw new ForbiddenException()
  }

  @Query((returns) => MemberType)
  @UseGuards(AdminOnly)
  @UseGuards(JwtAuthGuard)
  async getMemberByEmail(
    @Args({name: 'id', type: () => String}) email: string,
  ) {
    return this.memberService.getByEmail(email)
  }

  @Query((returns) => Viewer)
  async whoAmI(@CurrentUserCookie() viewer: string) {
    if (!viewer) {
      return {didRequest: true}
    }

    const user = this.jwtService.verify(viewer) as JwtPayload

    const {
      _id,
      firstName,
      lastName,
      email,
      isAdmin,
      avatar,
    } = await this.memberService.getById(user.id)

    return {
      id: _id,
      didRequest: true,
      firstName,
      lastName,
      email,
      isAdmin,
      avatar,
    }
  }

  @Mutation((returns) => MemberType)
  @UseGuards(JwtAuthGuard)
  async updateMember(
    @Args({name: 'UpdateUserInput', type: () => UpdateMemberInput})
    updateMemberData: any,
    @CurrentUser() user: JwtPayload,
  ) {
    const {id, ...otherData} = updateMemberData

    return this.memberService.updateMember(id, otherData, user)
  }

  @Mutation((returns) => MemberType)
  @UseGuards(AdminOnly)
  @UseGuards(JwtAuthGuard)
  async deleteMember(@Args({name: 'id', type: () => String}) id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('invalid member id')
    }

    return this.memberService.deleteMember(id)
  }

  @ResolveField(() => CartType)
  async cart(@Parent() member: MemberType) {
    return this.cartService.getMyCarts(member.id)
  }

  @ResolveField(() => FavouriteType)
  async favourite(@Parent() member: MemberType) {
    return this.favouriteService.getMyFavourites(member.id)
  }
}
