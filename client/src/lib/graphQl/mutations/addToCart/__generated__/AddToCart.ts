/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToCart
// ====================================================

export interface AddToCart_addToCart_products {
  __typename: 'CartProduct'
  id: string
  image: string
  name: string
  description: string
  price: number
  qty: number
  size: string
  slug: string
}

export interface AddToCart_addToCart {
  __typename: 'Cart'
  products: AddToCart_addToCart_products[]
}

export interface AddToCart {
  addToCart: AddToCart_addToCart
}

export interface AddToCartVariables {
  productId: string
  qty: number
  size: string
}
