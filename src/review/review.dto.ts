import { IsEnum, IsInt, IsMongoId, IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator"

import { SortReviewsBy } from "src/review/review.input"

export class CreateReviewDto {
  @IsString()
  @IsMongoId()
  productId: string;

  @IsString()
  @MinLength(3)
  comment: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}

export class UpdateReviewDto {

  @IsString()
  @IsMongoId()
  reviewId: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  comment: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}

export class GetReviewsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)

  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsMongoId()
  @IsOptional()
  productId?: string;

  @IsEnum(SortReviewsBy)
  @IsOptional()
  sortBy?: SortReviewsBy;
}