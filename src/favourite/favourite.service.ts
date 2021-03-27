import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { sortImgArr } from 'src/lib/utils/sortImgArr';
import { Product, ProductDoc } from 'src/product/product.entity';
import { Favourite, FavouriteDoc, IFavouriteProducts } from './favourite.entity'

@Injectable()
export class FavouriteService {
  constructor(
    @InjectModel(Favourite.name) private favourites: Model<FavouriteDoc>,
    @InjectModel(Product.name) private product: Model<ProductDoc>
  ) { }


  async getMyFavourites(memberId: string) {

    const favourite = await this.favourites.findOne({ memberId })

    if (!favourite) { throw new NotFoundException(`no favourites found with member id ${memberId}`) }

    return favourite

  }

  async addToFavourites(memberId: string, favouriteProductId: string) {

    const product = await this.product.findById(favouriteProductId)

    if (!product) { throw new NotFoundException(`no product with member id ${memberId}`) }

    const favProduct: IFavouriteProducts = {
      id: product._id,
      description: product.description,
      image: sortImgArr(product.images)[0],
      name: product.name,
      price: product.price,
      slug: product.slug,
    }

    const favourite = await this.favourites.findOneAndUpdate(
      { memberId },
      { $addToSet: { products: favProduct } },
      { returnOriginal: false }
    )

    if (!favourite) { throw new NotFoundException(`no favourites with member id ${memberId}`) }

    return favourite

  }

  async removeFromFavourites(memberId: string, productId: string) {

    const favourite = await this.favourites.findOneAndUpdate(
      { memberId },
      { $pull: { products: { id: productId } } },
      { returnOriginal: false }
    )

    if (!favourite) { throw new NotFoundException(`no favourites with member id ${memberId}`) }

    return favourite

  }

  async clearFavourites(memberId: string) {

    const cart = await this.favourites.findOneAndUpdate(
      { memberId },
      { $set: { products: [] } },
      { returnOriginal: false }
    )

    if (!cart) { throw new NotFoundException(`no cart found with member id ${memberId}`) }

    return cart

  }

}
