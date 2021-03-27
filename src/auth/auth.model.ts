import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Viewer')
export class Viewer {

  @Field(type => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  isAdmin?: boolean;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  didRequest: boolean;
}