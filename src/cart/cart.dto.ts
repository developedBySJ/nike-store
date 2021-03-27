import { IsInt, IsMongoId, IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator'

export class CartProductDto {

  @IsMongoId()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  qty: number;

}
export class AddToCartDto {

  @IsMongoId()
  id: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  qty: number;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  size: string;

}