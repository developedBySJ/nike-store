import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoginInput {

  @Field()
  email: string;

  @Field()
  password: string;
}
@InputType()
export class SignUpInput {

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  dateOfBirth: Date;

}