import {Field, ID, InputType, Int, registerEnumType} from '@nestjs/graphql'

import {Pagination} from 'src/lib/inputTypes/pagination'

@InputType()
export class ReviewMemberInput {
  @Field((type) => ID)
  id: string

  @Field((type) => String)
  firstName: string

  @Field((type) => String)
  lastName: string

  @Field((type) => String, {nullable: true})
  avatar?: string
}

@InputType()
export class CreateReviewInput {
  @Field((type) => ID)
  productId: string
  @Field((type) => String)
  comment: string
  @Field((type) => Int)
  rating: number
}

@InputType()
export class UpdateReviewInput {
  @Field((type) => ID)
  reviewId: string
  @Field((type) => String, {nullable: true})
  comment: string
  @Field((type) => Int, {nullable: true})
  rating: number
}

export enum SortReviewsBy {
  NEWEST = 'NEWEST',
  RATING_HIGH_TO_LOW = 'RATING_HIGH_TO_LOW',
  RATING_LOW_TO_HIGH = 'RATING_LOW_TO_HIGH',
}

registerEnumType(SortReviewsBy, {
  name: 'SortReviewsBy',
})

@InputType()
export class ReviewsFilter extends Pagination {
  @Field((type) => ID, {nullable: true})
  productId: string
  @Field((type) => SortReviewsBy, {nullable: true})
  sortBy?: SortReviewsBy
}
