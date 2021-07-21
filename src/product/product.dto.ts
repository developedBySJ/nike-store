import {FileUpload} from 'graphql-upload'
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  Max,
} from 'class-validator'

import {SortProductBy} from 'src/product/product.input'

export function IsNonPrimitiveArray(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsNonPrimitiveArray',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            Array.isArray(value) &&
            value.reduce(
              (a, b) => a && typeof b === 'object' && !Array.isArray(b),
              true,
            )
          )
        },
      },
    })
  }
}

export class ImageUploadArray {
  images: FileUpload | {promise: Promise<FileUpload>}[]
}

export class ProductFilterDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  material?: string

  @IsOptional()
  @IsArray()
  priceRange?: [number, number]

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  ratings?: number

  @IsOptional()
  @IsString()
  size?: string

  @IsOptional()
  @IsString()
  searchQuery?: string

  @IsEnum(SortProductBy)
  @IsOptional()
  sortBy?: SortProductBy
}

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsString()
  @MinLength(3)
  brand: string

  @IsString()
  @MinLength(3)
  category: string

  @IsArray()
  size: string[]

  @IsArray()
  fit: string[]

  @IsString()
  @MinLength(3)
  description: string

  @IsString()
  @MinLength(3)
  details: string

  @IsNumber({allowInfinity: false, allowNaN: false})
  @Min(1)
  price: number

  @IsNumber({allowInfinity: false, allowNaN: false})
  @Min(1)
  mrp: number

  @IsInt()
  @Min(1)
  availableStock: number

  @IsString()
  @IsOptional()
  material: string
}
