import {GraphQLUpload} from 'apollo-server-express'
import {Field, Float, InputType, Int, registerEnumType} from '@nestjs/graphql'

import {Pagination} from 'src/lib/inputTypes/pagination'

export enum SortProductBy {
  FEATURED = 'FEATURED',
  NEWEST = 'NEWEST',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
}

registerEnumType(SortProductBy, {
  name: 'SortProductBy',
})

@InputType()
export class CreateProductInput {
  @Field()
  name: string

  @Field((type) => [GraphQLUpload])
  images: any[]

  @Field()
  brand: string

  @Field()
  category: string

  @Field()
  description: string

  @Field()
  details: string

  @Field((type) => Float)
  price: number

  @Field((type) => Float)
  mrp: number

  @Field((type) => Int)
  availableStock: number

  @Field({nullable: true})
  material?: string

  @Field((type) => [String])
  size: string[]

  @Field((type) => [String])
  fit: string[]
}

@InputType({})
export class ProductFilter extends Pagination {
  @Field({nullable: true})
  searchQuery: string

  @Field({nullable: true})
  category?: string

  @Field({nullable: true})
  material?: string

  @Field({nullable: true})
  ratings?: number

  @Field((type) => [Int, Int], {nullable: true})
  priceRange?: [number, number]

  @Field({nullable: true})
  size?: string

  @Field((type) => SortProductBy, {
    nullable: true,
    defaultValue: SortProductBy.FEATURED,
  })
  sortBy?: SortProductBy
}
