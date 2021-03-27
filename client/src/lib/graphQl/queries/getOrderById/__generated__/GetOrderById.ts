/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrderById
// ====================================================

export interface GetOrderById_getOrder_payment {
  __typename: "Payment";
  customerName: string;
  email: string;
  id: string;
  status: string;
  method: string;
}

export interface GetOrderById_getOrder_products {
  __typename: "CartProduct";
  description: string;
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  size: string;
  slug: string;
}

export interface GetOrderById_getOrder_shippingAddress {
  __typename: "Address";
  addressLine1: string;
  city: string;
  country: string;
  postalCode: number;
}

export interface GetOrderById_getOrder {
  __typename: "Order";
  createdAt: any;
  deliveredAt: any | null;
  id: string;
  memberId: string;
  paidAt: any | null;
  payment: GetOrderById_getOrder_payment | null;
  products: GetOrderById_getOrder_products[];
  shippingAddress: GetOrderById_getOrder_shippingAddress;
  tax: number;
  totalPrice: number;
}

export interface GetOrderById {
  getOrder: GetOrderById_getOrder;
}

export interface GetOrderByIdVariables {
  id: string;
}
