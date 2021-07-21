/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {SortOrderBy, OrderStatus} from './../../../globaltypes'

// ====================================================
// GraphQL query operation: GetMyOrders
// ====================================================

export interface GetMyOrders_getMyOrders_products {
  __typename: 'CartProduct'
  id: string
  image: string
}

export interface GetMyOrders_getMyOrders {
  __typename: 'Order'
  createdAt: any
  deliveredAt: any | null
  id: string
  paidAt: any | null
  products: GetMyOrders_getMyOrders_products[]
  totalPrice: number
}

export interface GetMyOrders {
  getMyOrders: GetMyOrders_getMyOrders[]
}

export interface GetMyOrdersVariables {
  dateRange?: string[] | null
  limit?: number | null
  page?: number | null
  sortBy?: SortOrderBy | null
  status?: OrderStatus | null
}
