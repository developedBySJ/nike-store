import {BadRequestException, UseGuards} from '@nestjs/common'
import {Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql'
import {isMongoId} from 'class-validator'
import {AdminOnly} from 'src/auth/guards/admin-only.guard'
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard'
import {JwtPayload} from 'src/auth/types'
import {CurrentUser} from 'src/lib/decorators/CurrentUser.decorator'
import {CreateOrderDto, OrderFilterDto} from './order.dto'
import {CreateOrderInput, OrderFilter} from './order.input'
import {OrderType} from './order.model'
import {OrderService} from './order.service'

@Resolver()
export class OrderResolver {
  constructor(private orderService: OrderService) {}
  @UseGuards(JwtAuthGuard)
  @Query((returns) => OrderType)
  async getOrder(
    @Args({name: 'id', type: () => ID}) orderId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    if (!isMongoId(orderId)) {
      throw new BadRequestException('Invalid Order ID')
    }
    return this.orderService.getOrder(orderId, user)
  }

  @UseGuards(AdminOnly)
  @UseGuards(JwtAuthGuard)
  @Query((returns) => [OrderType])
  async getOrders(
    @Args({name: 'OrderFilter', type: () => OrderFilter})
    orderFilter: OrderFilterDto,
  ) {
    return this.orderService.getOrders(orderFilter)
  }

  @UseGuards(JwtAuthGuard)
  @Query((returns) => [OrderType])
  async getMyOrders(
    @Args({name: 'OrderFilter', type: () => OrderFilter})
    orderFilter: OrderFilterDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.orderService.getOrders({...orderFilter, viewer: user})
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => OrderType)
  async createOrder(
    @Args({name: 'CreateOrderInput', type: () => CreateOrderInput})
    createOrderInput: CreateOrderDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.orderService.createOrder({...createOrderInput, user})
  }

  @UseGuards(AdminOnly)
  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => OrderType)
  async updateOrder(@Args({name: 'orderId', type: () => ID}) orderId: string) {
    if (!isMongoId(orderId)) {
      throw new BadRequestException('Invalid Order ID')
    }
    return this.orderService.updateOrder(orderId)
  }

  @Mutation((returns) => OrderType)
  @UseGuards(AdminOnly)
  @UseGuards(JwtAuthGuard)
  async deleteOrder(@Args({name: 'id', type: () => ID}) orderId: string) {
    if (!isMongoId(orderId)) {
      throw new BadRequestException('Invalid Order ID')
    }
    return this.orderService.deleteOrder(orderId)
  }
}
