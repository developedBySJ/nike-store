import {Field, Float, ID, InputType} from '@nestjs/graphql'

@InputType()
export class FavouriteProductInput {
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
