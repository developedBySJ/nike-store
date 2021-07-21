import {MongooseModule} from '@nestjs/mongoose'

import {Module} from '@nestjs/common'
import {CartModule} from 'src/cart/cart.module'
import {OrderService} from 'src/order/order.service'
import {OrderResolver} from 'src/order/order.resolver'
import {Order, OrderSchema} from 'src/order/order.enitity'
import {Member, MemberSchema} from 'src/member/member.entity'
import {Product, ProductSchema} from 'src/product/product.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
    MongooseModule.forFeature([{name: Member.name, schema: MemberSchema}]),
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
    CartModule,
  ],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
