import {IsMongoId, IsNotEmpty, IsNumber, IsString, Min} from 'class-validator'

export class FavouriteProductDto {
  @IsMongoId()
  id: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  image: string

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  price: number

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  slug: string
}
