import { Field, ID, InputType, Int, registerEnumType } from '@nestjs/graphql'
import { GraphQLUpload } from 'apollo-server-express'
import { Pagination } from 'src/lib/inputTypes/pagination'

@InputType()
export class AddressInput {

  @Field()
  addressLine1: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field(type => Int)
  postalCode: number;

}
@InputType()
export class UpdateMemberInput {

  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  dateOfBirth: string;

  @Field({ nullable: true })
  currPassword: string;

  @Field({ nullable: true })
  newPassword: string;

  @Field({ nullable: true })
  isAdmin: boolean;

  @Field(type => GraphQLUpload, { nullable: true })
  avatar: any;

  @Field(type => AddressInput, { nullable: true })
  address: AddressInput;

}

export enum SortMemberBy {
  ASC_NAME = "ASC_NAME",
  DESC_NAME = "DESC_NAME",
  ROLE = "ROLE"
}

registerEnumType(SortMemberBy, {
  name: "SortMemberBy"
})

@InputType()
export class MemberFilter extends Pagination {

  @Field(type => SortMemberBy, { nullable: true })
  sortBy?: SortMemberBy

}