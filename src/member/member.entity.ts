import {Document} from 'mongoose'
import * as mongoose from 'mongoose'
import {Prop, Schema, raw, SchemaFactory} from '@nestjs/mongoose'

import {IAddress} from './member.type'
import {Cart} from 'src/cart/cart.entity'
import {Favourite} from 'src/favourite/favourite.entity'

export type MemberDoc = Member & Document

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id
      delete ret._id
      delete ret.__v
    },
  },
})
export class Member {
  @Prop({required: true})
  firstName: string

  @Prop({required: true})
  lastName: string

  @Prop({required: true})
  password: string

  @Prop({required: true, default: false})
  isAdmin: boolean

  @Prop({required: true})
  dateOfBirth: Date

  @Prop()
  avatar?: string

  @Prop({required: true})
  email: string

  @Prop(
    raw({
      addressLine1: {type: String},
      city: {type: String},
      postalCode: {type: Number},
      country: {type: String},
    }),
  )
  address?: IAddress

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Cart.name})
  cart: Cart

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Favourite.name})
  favourites: Favourite
}

export const MemberSchema = SchemaFactory.createForClass(Member)
