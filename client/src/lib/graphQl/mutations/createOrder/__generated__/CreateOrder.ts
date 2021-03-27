/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderProducts, AddressInput } from "./../../../globaltypes";

// ====================================================
// GraphQL mutation operation: CreateOrder
// ====================================================

export interface CreateOrder_createOrder_payment {
  __typename: "Payment";
  email: string;
  id: string;
  method: string;
  customerName: string;
  status: string;
}

export interface CreateOrder_createOrder_products {
  __typename: "CartProduct";
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  qty: number;
  size: string;
  slug: string;
}

export interface CreateOrder_createOrder_shippingAddress {
  __typename: "Address";
  addressLine1: string;
  city: string;
  country: string;
  postalCode: number;
}

export interface CreateOrder_createOrder {
  __typename: "Order";
  id: string;
  memberId: string;
  paidAt: any | null;
  payment: CreateOrder_createOrder_payment | null;
  products: CreateOrder_createOrder_products[];
  shippingAddress: CreateOrder_createOrder_shippingAddress;
  tax: number;
  totalPrice: number;
  createdAt: any;
}

export interface CreateOrder {
  createOrder: CreateOrder_createOrder;
}

export interface CreateOrderVariables {
  products: OrderProducts[];
  shippingAddress: AddressInput;
  stripeToken: string;
  tax: number;
  totalPrice: number;
}
