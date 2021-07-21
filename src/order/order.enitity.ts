import * as mongoose from 'mongoose'
import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose'

import {Ipayment} from 'src/order/order.types'
import {Member} from 'src/member/member.entity'
import {IAddress} from 'src/member/member.type'
import {CartProductsSchema} from 'src/cart/cart.entity'
import {ICartProducts} from 'src/cart/cart.type'

export type OrderDoc = Order & mongoose.Document

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id
      delete ret._id
      delete ret.__v
    },
  },
  timestamps: true,
})
export class Order {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Member.name})
  memberId: string

  @Prop({required: true})
  totalPrice: number

  @Prop()
  tax: number

  @Prop()
  paidAt?: Date

  @Prop()
  deliveredAt?: Date

  @Prop(
    raw({
      addressLine1: {type: String},
      city: {type: String},
      postalCode: {type: Number},
      country: {type: String},
    }),
  )
  shippingAddress: IAddress

  @Prop(
    raw({
      id: {type: String},
      method: {type: String},
      status: {type: String},
      email: {type: String},
      customerName: {type: String},
    }),
  )
  payment: Ipayment

  @Prop({type: [CartProductsSchema], required: true})
  products: ICartProducts[]
}

export const OrderSchema = SchemaFactory.createForClass(Order)
