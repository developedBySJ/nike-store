import {Field, Float, ID, ObjectType} from '@nestjs/graphql'

@ObjectType('FavouriteProduct')
class FavouriteProducts {
  @Field((type) => ID)
  id: string

  @Field()
  name: string

  @Field()
  image: string

  @Field((type) => Float)
  price: number

  @Field()
  description: string

  @Field()
  slug: string
}

@ObjectType('Favourite')
export class FavouriteType {
  @Field((type) => ID)
  id: string

  @Field((type) => ID)
  memberId: string

  @Field((type) => [FavouriteProducts])
  products: FavouriteProducts[]

  @Field()
  createdAt: string
}
