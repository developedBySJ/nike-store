import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { FavouriteService } from 'src/favourite/favourite.service'
import { FavouriteResolver } from 'src/favourite/favourite.resolver'
import { Favourite, FavouriteSchema } from 'src/favourite/favourite.entity'
import { Product, ProductSchema } from 'src/product/product.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Favourite.name, schema: FavouriteSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  providers: [FavouriteService, FavouriteResolver],
  exports: [FavouriteService]

})

export class FavouriteModule { }
