import {MongooseModule} from '@nestjs/mongoose'
import {forwardRef, Module} from '@nestjs/common'

import {AuthModule} from 'src/auth/auth.module'
import {CartModule} from 'src/cart/cart.module'
import {ReviewModule} from 'src/review/review.module'
import {MemberService} from 'src/member/member.service'
import {MemberResolver} from 'src/member/member.resolver'
import {MemberSchema, Member} from 'src/member/member.entity'
import {FavouriteModule} from 'src/favourite/favourite.module'
import {Review, ReviewSchema} from 'src/review/review.enitity'

@Module({
  imports: [
    MongooseModule.forFeature([{name: Member.name, schema: MemberSchema}]),
    MongooseModule.forFeature([{name: Review.name, schema: ReviewSchema}]),
    forwardRef(() => ReviewModule),
    forwardRef(() => AuthModule),
    forwardRef(() => FavouriteModule),
    forwardRef(() => CartModule),
  ],
  providers: [MemberService, MemberResolver],
  exports: [MemberService],
})
export class MemberModule {}
