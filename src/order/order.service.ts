import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/auth/types';
import { ObjectId } from 'mongodb'
import { Member, MemberDoc } from 'src/member/member.entity';
import { Product, ProductDoc } from 'src/product/product.entity';
import { Stripe } from 'src/lib/api/stripe';
import { Order, OrderDoc } from './order.enitity';
import { ICreateOrder, IOrderFilter } from './order.types';
import { CartService } from 'src/cart/cart.service';
import { OrderStatus, SortOrderBy } from './order.input';
import { ICartProducts } from 'src/cart/cart.type';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orders: Model<OrderDoc>,
    @InjectModel(Member.name) private members: Model<MemberDoc>,
    @InjectModel(Product.name) private products: Model<ProductDoc>,
    private cartService: CartService
  ) { }
  async getOrder(id: string, viewer: JwtPayload) {
    const order = await this.orders.findById(id);
    if (!order) {
      return new NotFoundException(`Order not found with id #${order.id}`)
    }
    if (String(order.memberId) === viewer.id || viewer.isAdmin) {
      return order;
    }
    throw new UnauthorizedException();
  }
  async getOrders({ limit, page, dateRange, sortBy, status, viewer }: IOrderFilter) {

    const skip = (page - 1) * limit

    const orderStatus = status === OrderStatus.PENDING ? { deliveredAt: { $exists: false } } : {}
    const dateFilter = dateRange?.length === 2 ? { createdAt: { $gte: dateRange[0], $lte: dateRange[1] } } : {}

    const queryObj = { ...viewer && { memberId: viewer.id }, ...orderStatus, ...dateFilter }

    const query = this.orders.find(queryObj).limit(limit).skip(skip)

    switch (sortBy) {
      case SortOrderBy.NEWEST_FIRST:
        query.sort({ createdAt: -1 })
        break;
      case SortOrderBy.OLDEST_FIRST:
        query.sort({ createdAt: 1 })
        break;
      case SortOrderBy.STATUS:
        query.sort({ deliveredAt: 1 })
        break;
      case SortOrderBy.TOTAL_PRICE_HIGH_TO_LOW:
        query.sort({ totalPrice: -1 })
        break;
      case SortOrderBy.TOTAL_PRICE_LOW_TO_HIGH:
        query.sort({ totalPrice: 1 })
        break;

      default:
        break;
    }


    const orders = await query;
    return orders
  }

  async createOrder(createOrderInput: ICreateOrder) {
    const { products, shippingAddress, stripeToken, tax, totalPrice, user: member } = createOrderInput
    // console.log({ createOrderInput })
    const user = await this.members.findById(member.id);
    if (!user) {
      throw new NotFoundException(`Member not found with id #${member.id}`)
    }

    const productIds = products.map(product => product.id)
    // console.log({ productIds })
    const productArray = await this.products.find({ '_id': { $in: productIds } })
      .select({ _id: 1, name: 1, price: 1, slug: 1, description: 1, images: 1, size: 1 })
    // console.log({ productArray })

    const productArrayObj: { [key: string]: ICartProducts } = productArray.reduce((acc, curr) => ({
      ...acc,
      [`${curr.id}`]: {
        ...curr.toObject({
          transform: (doc, ret) => {
            ret.id = doc.__id
            delete ret.__id
          }
        })
      }
    }), {})
    // console.log({ productArrayObj })
    const validatedProductArr: ICartProducts[] = products.map(product => {
      if (productArrayObj[product.id]) {

        if (productArrayObj[product.id].price !== product.price) {
          return null
        }
        if (!productArrayObj[product.id].size.includes(product.size)) {
          return null
        }
        return { ...product }
      }
      return null;

    })
    // console.log({ validatedProductArr })
    if (validatedProductArr.includes(null)) {
      throw new BadRequestException("Some products are not available right now.Please try again later");
    }

    const orderTotal = products.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
    // console.log({ orderTotal, totalPrice })
    if (orderTotal !== totalPrice) {
      throw new BadRequestException("Provided total price and calculated total price are not matching!");
    }

    const orderId = new ObjectId()

    const newOrder = await this.orders.create({
      _id: orderId,
      totalPrice: orderTotal,
      memberId: user.id,
      shippingAddress,
      products: products,
      tax: tax || totalPrice * 0.12,


    })

    const newPayment = await Stripe.charge({
      address: shippingAddress,
      amount: orderTotal,
      customerName: `${user.firstName + user.lastName}`,
      source: stripeToken,
      orderId: orderId.toHexString()
    })

    if (newPayment.status !== 'succeeded') {
      throw new InternalServerErrorException("Unable to process payments.Please try agian later");
    }
    newOrder.set({
      payment: {
        email: user.email,
        id: newPayment.id,
        method: newPayment.payment_method,
        status: newPayment.status,
        customerName: `${user.firstName} ${user.lastName}`,
      },
      paidAt: new Date(),
    })

    await newOrder.save()
    await this.cartService.clearCart(user.id)

    return newOrder
  }

  async updateOrder(orderId: string, deliveredAt?: string) {
    const updated_order = await this.orders.findByIdAndUpdate(orderId, { deliveredAt: deliveredAt ? new Date(deliveredAt) : new Date() }, { returnOriginal: false })
    if (!updated_order) {
      throw new NotFoundException(`no order found with id #${orderId}`);
    }
    return updated_order

  }


  async deleteOrder(orderId: string) {
    const order = await this.orders.findByIdAndDelete(orderId)
    if (!order) {
      throw new NotFoundException(`no order found with id #${orderId}`);
    }
    return order
  }

}
