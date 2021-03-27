/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyCart
// ====================================================

export interface GetMyCart_getMyCart_products {
  __typename: "CartProduct";
  description: string;
  image: string;
  name: string;
  price: number;
  qty: number;
  size: string;
  slug: string;
  id: string;
}

export interface GetMyCart_getMyCart {
  __typename: "Cart";
  id: string;
  products: GetMyCart_getMyCart_products[];
}

export interface GetMyCart {
  getMyCart: GetMyCart_getMyCart;
}
