/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateOrder
// ====================================================

export interface UpdateOrder_updateOrder_payment {
  __typename: "Payment";
  customerName: string;
  email: string;
  id: string;
  status: string;
  method: string;
}

export interface UpdateOrder_updateOrder_products {
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

export interface UpdateOrder_updateOrder_shippingAddress {
  __typename: "Address";
  addressLine1: string;
  city: string;
  country: string;
  postalCode: number;
}

export interface UpdateOrder_updateOrder {
  __typename: "Order";
  createdAt: any;
  deliveredAt: any | null;
  id: string;
  memberId: string;
  paidAt: any | null;
  payment: UpdateOrder_updateOrder_payment | null;
  products: UpdateOrder_updateOrder_products[];
  shippingAddress: UpdateOrder_updateOrder_shippingAddress;
  tax: number;
  totalPrice: number;
}

export interface UpdateOrder {
  updateOrder: UpdateOrder_updateOrder;
}

export interface UpdateOrderVariables {
  orderId: string;
}
