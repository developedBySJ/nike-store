import {MongooseModule} from '@nestjs/mongoose'
import {forwardRef, Module} from '@nestjs/common'

import {CartService} from './cart.service'
import {CartResolver} from './cart.resolver'
import {Cart, CartSchema} from './cart.entity'
import {MemberModule} from 'src/member/member.module'
import {ProductModule} from 'src/product/product.module'

@Module({
  imports: [
    MongooseModule.forFeature([{name: Cart.name, schema: CartSchema}]),
    forwardRef(() => MemberModule),
    forwardRef(() => ProductModule),
  ],
  providers: [CartService, CartResolver],
  exports: [CartService],
})
export class CartModule {}
