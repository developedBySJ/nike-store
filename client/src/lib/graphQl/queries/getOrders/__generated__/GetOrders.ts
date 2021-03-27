/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortOrderBy, OrderStatus } from "./../../../globaltypes";

// ====================================================
// GraphQL query operation: GetOrders
// ====================================================

export interface GetOrders_getOrders_payment {
  __typename: "Payment";
  id: string;
}

export interface GetOrders_getOrders_products {
  __typename: "CartProduct";
  id: string;
  name: string;
  slug: string;
  size: string;
  qty: number;
}

export interface GetOrders_getOrders_shippingAddress {
  __typename: "Address";
  addressLine1: string;
  city: string;
  country: string;
  postalCode: number;
}

export interface GetOrders_getOrders {
  __typename: "Order";
  createdAt: any;
  deliveredAt: any | null;
  id: string;
  memberId: string;
  paidAt: any | null;
  payment: GetOrders_getOrders_payment | null;
  products: GetOrders_getOrders_products[];
  shippingAddress: GetOrders_getOrders_shippingAddress;
  tax: number;
  totalPrice: number;
}

export interface GetOrders {
  getOrders: GetOrders_getOrders[];
}

export interface GetOrdersVariables {
  dateRange?: string[] | null;
  limit?: number | null;
  page?: number | null;
  sortBy?: SortOrderBy | null;
  status?: OrderStatus | null;
}
