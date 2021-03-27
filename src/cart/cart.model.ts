import { Field, Float, ID, Int, ObjectType, } from '@nestjs/graphql'

@ObjectType('CartProduct')
export class CartProductsType {

  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field(type => Float)
  price: number;

  @Field()
  description: string;

  @Field()
  slug: string;

  @Field()
  size: string;

  @Field(type => Int)
  qty: number;

}

@ObjectType('Cart')
export class CartType {

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  memberId: string;

  @Field(type => [CartProductsType])
  products: CartProductsType[];

  @Field()
  createdAt: string;

}