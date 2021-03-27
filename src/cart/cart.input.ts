import { Field, ID, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CartProductInput {

  @Field(type => ID)
  id: string;

  @Field()
  size: string;

  @Field(type => Int)
  qty: number;

}

@InputType()
export class UpdateCartProductQtyInput {

  @Field(type => ID)
  id: string;

  @Field(type => String)
  size: string;

  @Field(type => Int)
  qty: number;

}