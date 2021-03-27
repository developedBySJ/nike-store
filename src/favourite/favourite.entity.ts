import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type FavouriteDoc = Favourite & mongoose.Document

export interface IFavouriteProducts {
  id: string;
  image: string;
  name: string;
  price: number;
  slug: string;
  description: string;
}


@Schema({ _id: false, timestamps: { createdAt: true } })
class FavouriteProducts {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  id: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  description: string;

}
export const FavouriteProductsSchema = SchemaFactory.createForClass(FavouriteProducts);

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
export class Favourite {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  memberId: string;

  @Prop({ type: [FavouriteProductsSchema], default: [] })
  products: IFavouriteProducts[];

}

export const FavouriteSchema = SchemaFactory.createForClass(Favourite);