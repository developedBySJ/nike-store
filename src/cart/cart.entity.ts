import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { ICartProducts } from './cart.type'

export type CartDoc = Cart & mongoose.Document
@Schema({ _id: false, timestamps: { createdAt: true } })
export class CartProducts {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  id: string;

  @Prop({ required: true })
  image: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  price: number

  @Prop({ required: true })
  qty: number

  @Prop({ required: true })
  size: string

  @Prop({ required: true })
  slug: string

  @Prop({ required: true })
  description: string

}

export const CartProductsSchema = SchemaFactory.createForClass(CartProducts);

@Schema({
  timestamps: { createdAt: true },
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id
      delete ret.__v

    }
  }
})
export class Cart {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  memberId: string;

  @Prop({ type: [CartProductsSchema], default: [] })
  products: ICartProducts[];

}

export const CartSchema = SchemaFactory.createForClass(Cart);