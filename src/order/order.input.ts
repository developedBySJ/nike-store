import {Field, InputType, registerEnumType} from '@nestjs/graphql'

import {IAddress} from 'src/member/member.type'
import {ICartProducts} from 'src/cart/cart.type'
import {CartProductInput} from 'src/cart/cart.input'
import {AddressInput} from 'src/member/member.input'
import {Pagination} from 'src/lib/inputTypes/pagination'

@InputType()
class OrderProducts extends CartProductInput {
  @Field()
  price: number

  @Field()
  image: string

  @Field()
  name: string

  @Field()
  slug: string

  @Field()
  description: string
}
@InputType()
export class CreateOrderInput {
  @Field()
  totalPrice: number

  @Field()
  tax: number

  @Field((type) => AddressInput)
  shippingAddress: IAddress

  @Field()
  stripeToken: string

  @Field((type) => [OrderProducts])
  products: ICartProducts[]
}

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export enum SortOrderBy {
  TOTAL_PRICE_HIGH_TO_LOW = 'TOTAL_PRICE_HIGH_TO_LOW',
  TOTAL_PRICE_LOW_TO_HIGH = 'TOTAL_PRICE_LOW_TO_HIGH',
  NEWEST_FIRST = 'NEWEST_FIRST',
  OLDEST_FIRST = 'OLDEST_FIRST',
  STATUS = 'STATUS',
}

registerEnumType(SortOrderBy, {
  name: 'SortOrderBy',
})

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
})

@InputType()
export class OrderFilter extends Pagination {
  @Field((type) => OrderStatus, {nullable: true})
  status: OrderStatus

  @Field((type) => [String], {nullable: true})
  dateRange: [string, string]

  @Field((type) => SortOrderBy, {nullable: true})
  sortBy: SortOrderBy
}
