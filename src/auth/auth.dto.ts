import { IsDate, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class SignUpDto {

  @MinLength(3)
  @MaxLength(15)
  firstName: string;

  @MinLength(2)
  @MaxLength(15)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @MaxLength(15)
  password: string;

  @IsDate()
  dateOfBirth: string;

}

export class LoginDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

}