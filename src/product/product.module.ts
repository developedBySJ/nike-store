import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {ProductService} from 'src/product/product.service'
import {ProductResolver} from 'src/product/product.resolver'
import {Product, ProductSchema} from 'src/product/product.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
  ],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
