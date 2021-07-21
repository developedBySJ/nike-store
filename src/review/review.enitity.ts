import * as mongoose from 'mongoose'
import {SchemaFactory, Schema, Prop} from '@nestjs/mongoose'

import {Member} from 'src/member/member.entity'
import {IReviewMember} from 'src/review/review.type'

export type ReviewDoc = Review & mongoose.Document

@Schema({_id: false})
class ReviewMember {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Member.name,
    required: true,
  })
  id: string

  @Prop({required: true})
  firstName: string

  @Prop({required: true})
  lastName: string

  @Prop({type: String})
  avatar?: string
}
export const ReviewMemberSchema = SchemaFactory.createForClass(ReviewMember)

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
export class Review {
  @Prop({type: ReviewMemberSchema, required: true})
  member: IReviewMember

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true})
  productId: string

  @Prop()
  productSlug: string

  @Prop()
  comment: string

  @Prop({
    set: function (rating: number) {
      this._prevRating = this.rating
      return rating
    },
  })
  rating: number
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
