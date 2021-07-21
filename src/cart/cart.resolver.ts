import {UseGuards} from '@nestjs/common'
import {Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql'

import {CartType} from './cart.model'
import {AddToCartDto} from './cart.dto'
import {JwtPayload} from 'src/auth/types'
import {CartService} from './cart.service'
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard'
import {CurrentUser} from 'src/lib/decorators/CurrentUser.decorator'
import {CartProductInput, UpdateCartProductQtyInput} from './cart.input'

@Resolver()
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query((returns) => CartType)
  @UseGuards(JwtAuthGuard)
  async getMyCart(@CurrentUser() user: JwtPayload) {
    return this.cartService.getMyCarts(user.id)
  }

  @Mutation((returns) => CartType)
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @CurrentUser() user: JwtPayload,
    @Args({name: 'CartProductInput', type: () => CartProductInput})
    product: AddToCartDto,
  ) {
    return this.cartService.addToCart(user.id, product)
  }

  @Mutation((returns) => CartType)
  @UseGuards(JwtAuthGuard)
  async removeFromCart(
    @CurrentUser() user: JwtPayload,
    @Args({name: 'productId', type: () => ID}) productId: string,
    @Args({name: 'size', type: () => String}) size: string,
  ) {
    return this.cartService.removeFromCart(user.id, productId, size)
  }

  @Mutation((returns) => CartType)
  @UseGuards(JwtAuthGuard)
  async clearCart(@CurrentUser() user: JwtPayload) {
    return this.cartService.clearCart(user.id)
  }

  @Mutation((returns) => CartType)
  @UseGuards(JwtAuthGuard)
  async updateCartProductQty(
    @Args({
      name: 'UpdateCartProductQtyInput',
      type: () => UpdateCartProductQtyInput,
    })
    product: {id: string; qty: number; size: string},
    @CurrentUser() user: JwtPayload,
  ) {
    return this.cartService.updateCartProductQty(user.id, product)
  }
}
