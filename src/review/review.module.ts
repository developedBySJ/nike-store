import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ReviewService } from 'src/review/review.service'
import { ProductModule } from 'src/product/product.module'
import { ReviewResolver } from 'src/review/review.resolver'
import { Member, MemberSchema } from 'src/member/member.entity'
import { Review, ReviewSchema } from 'src/review/review.enitity'
import { Product, ProductSchema } from 'src/product/product.entity'

@Module({
  imports: [
    forwardRef(() => ProductModule),
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  ],
  providers: [ReviewService, ReviewResolver],
  exports: [ReviewService]
})

export class ReviewModule { }
