import {Field, ID, ObjectType} from '@nestjs/graphql'

import {Ipayment} from 'src/order/order.types'
import {IAddress} from 'src/member/member.type'
import {ICartProducts} from 'src/cart/cart.type'
import {AddressType} from 'src/member/member.model'
import {CartProductsType} from 'src/cart/cart.model'

@ObjectType('Payment')
class PaymentType {
  @Field()
  id: string

  @Field()
  method: string

  @Field()
  status: string

  @Field()
  email: string

  @Field()
  customerName: string
}

@ObjectType('Order')
export class OrderType {
  @Field((type) => ID)
  id: string

  @Field((type) => ID)
  memberId: string

  @Field()
  totalPrice: number

  @Field()
  tax: number

  @Field({nullable: true})
  paidAt?: Date

  @Field({nullable: true})
  deliveredAt?: Date

  @Field((type) => AddressType)
  shippingAddress: IAddress

  @Field((type) => PaymentType, {nullable: true})
  payment: Ipayment

  @Field((type) => [CartProductsType])
  products: ICartProducts[]

  @Field()
  createdAt: Date
}
