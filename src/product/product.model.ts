import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql'

import { ReviewMemberType } from 'src/review/review.model'

@ObjectType('ProductReview')
class ProductReviewType {

  @Field(type => ID)
  id: string;

  @Field(type => ReviewMemberType)
  member: ReviewMemberType;

  @Field()
  rating: number;

  @Field()
  comment: string;

  @Field()
  createdAt: Date;

}

@ObjectType("Product")
export class ProductType {

  @Field(type => ID)
  id: string;
  @Field()
  name: string;

  @Field(type => [String])
  images: string[];

  @Field()
  brand: string;

  @Field()
  category: string;

  @Field()
  description: string;

  @Field()
  details: string;

  @Field()
  ratings: number;

  @Field(type => Int)
  numOfReviews: number

  @Field(type => Float)
  price: number;

  @Field(type => Float)
  mrp: number;

  @Field(type => Int)
  availableStock: number;

  @Field({ nullable: true })
  material?: string;

  @Field()
  slug: string;

  @Field()
  createdAt: string;

  @Field(type => [String])
  size: string[];


  @Field(type => [String])
  fit: string[];

  @Field(type => [ProductReviewType], { nullable: true })
  reviews: ProductReviewType[];

}