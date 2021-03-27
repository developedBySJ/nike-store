/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveFromCart
// ====================================================

export interface RemoveFromCart_removeFromCart_products {
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

export interface RemoveFromCart_removeFromCart {
  __typename: "Cart";
  id: string;
  createdAt: string;
  products: RemoveFromCart_removeFromCart_products[];
}

export interface RemoveFromCart {
  removeFromCart: RemoveFromCart_removeFromCart;
}

export interface RemoveFromCartVariables {
  productId: string;
  size: string;
}
