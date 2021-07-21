import {Field, InputType, Int} from '@nestjs/graphql'
import {IsInt, IsOptional, Min} from 'class-validator'

@InputType()
export class Pagination {
  @Field((type) => Int, {nullable: true, defaultValue: 8})
  limit?: number

  @Field((type) => Int, {nullable: true, defaultValue: 1})
  page?: number
}

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number
}
export interface IPagination {
  limit?: number
  page?: number
}
