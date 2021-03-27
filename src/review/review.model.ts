import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType('ReviewMember')
export class ReviewMemberType {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  firstName: string;

  @Field(type => String)
  lastName: string;

  @Field(type => String, { nullable: true })
  avatar?: string;
}

@ObjectType('Review')
export class ReviewType {
  @Field(type => ID)
  id: string;

  @Field(type => ReviewMemberType)
  member: ReviewMemberType;

  @Field(type => String)
  productId: string;

  @Field(type => String)
  productSlug: string;

  @Field(type => String)
  comment: string;

  @Field(type => Int)
  rating: number;

  @Field()
  createdAt: Date;
}