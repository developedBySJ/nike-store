import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { CartType } from 'src/cart/cart.model'
import { FavouriteType } from 'src/favourite/favourite.model'

@ObjectType('Address')
export class AddressType {

  @Field()
  addressLine1: string;

  @Field()
  city: string;

  @Field(type => Int)
  postalCode: number;

  @Field()
  country: string;

}

@ObjectType('Member')
export class MemberType {

  @Field(type => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  isAdmin: boolean;

  @Field()
  dateOfBirth: Date;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  email: string;

  @Field(type => AddressType, { nullable: true, defaultValue: null })
  address?: AddressType

  @Field(type => CartType, { nullable: true })
  cart?: CartType

  @Field(type => FavouriteType, { nullable: true })
  favourite?: FavouriteType

  @Field()
  createdAt: Date;

}