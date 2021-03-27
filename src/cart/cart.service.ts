import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common'

import { ICartProducts } from './cart.type'
import { Cart, CartDoc } from './cart.entity'
import { sortImgArr } from 'src/lib/utils/sortImgArr'
import { ProductService } from 'src/product/product.service'

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private carts: Model<CartDoc>,
    @Inject(forwardRef(() => ProductService)) private products: ProductService
  ) { }

  async getMyCarts(memberId: string) {

    const cart = await this.carts.findOne({ memberId })

    if (!cart) { throw new NotFoundException(`no cart found with member id ${memberId}`) }

    return cart

  }

  async createCart(memberId: string) {

    return this.carts.create({ memberId, products: [] })

  }

  async getCartById(id: string) {

    const cart = await this.carts.findById(id)

    if (!cart) { throw new NotFoundException(`no cart found with id ${id}`) }

    return cart

  }

  async addToCart(memberId: string, product: { id: string, qty: number, size: string }) {

    const { size, slug, price, description, name, _id, images, } = await this.products.getProductById(product.id)

    const cartItem: ICartProducts = {
      description,
      id: _id,
      image: sortImgArr(images)[0],
      name,
      price,
      qty: product.qty,
      slug,
      size: (size.includes(product.size) ? product.size : "One Size").trim()
    }

    const cart = await this.carts.findOneAndUpdate(
      { memberId },
      { $addToSet: { products: cartItem } },
      { returnOriginal: false }
    )

    if (!cart) { throw new NotFoundException(`no cart found with member id ${memberId}`) }

    return cart

  }

  async removeFromCart(memberId: string, productId: string, size: string) {

    const cart = await this.carts.findOneAndUpdate(
      { memberId },
      { $pull: { products: { id: productId, size } } },
      { returnOriginal: false }
    )

    if (!cart) { throw new NotFoundException(`no cart found with member id ${memberId}`) }

    return cart

  }

  async updateCartProductQty(memberId: string, cartItem: { id: string, qty: number, size: string }) {

    const cart = await this.carts.findOneAndUpdate(
      { memberId, "products.id": cartItem.id, "products.size": cartItem.size.trim() },
      { $set: { "products.$.qty": cartItem.qty } },
      { returnOriginal: false }
    )

    if (!cart) { throw new NotFoundException(`either product doesn't exist in cart or cart not exist with member id "${memberId}"`) }

    return cart

  }

  async clearCart(memberId: string) {
    const cart = await this.carts.findOneAndUpdate(
      { memberId },
      { $set: { products: [] } },
      { returnOriginal: false }
    )

    if (!cart) { throw new NotFoundException(`no cart found with member id ${memberId}`) }

    return cart

  }
}
