import {Document} from 'mongoose'
import * as mongoose from 'mongoose'

import {IReviewMember} from 'src/review/review.type'
import {SchemaFactory, Schema, Prop} from '@nestjs/mongoose'
import {Review, ReviewMemberSchema} from 'src/review/review.enitity'

export type ProductDoc = Product & Document

@Schema({
  _id: false,
  timestamps: {createdAt: true},
})
class ProductReview {
  @Prop({type: ReviewMemberSchema, required: true})
  member: IReviewMember

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Review.name})
  id: string

  @Prop()
  comment: string

  @Prop()
  rating: number
}

const ProductReviewSchema = SchemaFactory.createForClass(ProductReview)

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id
      delete ret._id
      delete ret.__v
    },
  },
})
export class Product {
  @Prop({required: true})
  name: string

  @Prop({required: true})
  brand: string

  @Prop({required: true})
  category: string

  @Prop({type: [String], required: true})
  size: string[]

  @Prop({type: [String], required: true})
  fit: string[]

  @Prop({type: [String], required: true})
  images: string[]

  @Prop({required: true})
  description: string

  @Prop({required: true})
  slug: string

  @Prop({required: true})
  details: string

  @Prop({required: true, default: 0})
  ratings: number

  @Prop({required: true, default: 0})
  numOfReviews: number

  @Prop({required: true})
  price: number

  @Prop({required: true})
  mrp: number

  @Prop({required: true, default: 1})
  availableStock: number

  @Prop()
  material: string

  @Prop({type: [ProductReviewSchema], default: []})
  reviews: ProductReview[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
  .index({slug: 1})
  .index({name: 1})
  .index({category: 1})
  .index({name: 1, category: 1, description: 1})
  .index({price: 1, ratings: -1})
  .index(
    {
      name: 'text',
      brand: 'text',
      category: 'text',
      description: 'text',
    },
    {
      weights: {
        name: 5,
        brand: 1,
        category: 7,
        description: 10,
      },
    },
  )
