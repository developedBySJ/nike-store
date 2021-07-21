import {Type} from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator'
import {SortMemberBy} from './member.input'

export class AddressDto {
  @MinLength(3)
  @MaxLength(30)
  addressLine1: string

  @MinLength(3)
  @MaxLength(15)
  city: string

  @MinLength(3)
  @MaxLength(15)
  country: string

  @IsNumber()
  postalCode: number
}

export class UpdateMemberDto {
  @IsMongoId({message: 'invalid member id'})
  id: string

  @IsOptional()
  @MinLength(3)
  @MaxLength(15)
  firstName: string

  @IsOptional()
  @MinLength(2)
  @MaxLength(15)
  lastName: string

  @IsOptional()
  @IsISO8601()
  dateOfBirth: string

  @IsOptional()
  @MinLength(6)
  @MaxLength(15)
  currPassword: string

  @IsOptional()
  @IsOptional()
  @MinLength(6)
  @MaxLength(15)
  newPassword: string

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean

  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => AddressDto)
  address: AddressDto
}

export class MemberFilterDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number

  @IsOptional()
  @IsEnum(SortMemberBy)
  sortBy?: SortMemberBy
}
