/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCartProductQty
// ====================================================

export interface UpdateCartProductQty_updateCartProductQty_products {
  __typename: 'CartProduct'
  description: string
  id: string
  image: string
  name: string
  price: number
  qty: number
  size: string
  slug: string
}

export interface UpdateCartProductQty_updateCartProductQty {
  __typename: 'Cart'
  id: string
  createdAt: string
  products: UpdateCartProductQty_updateCartProductQty_products[]
}

export interface UpdateCartProductQty {
  updateCartProductQty: UpdateCartProductQty_updateCartProductQty
}

export interface UpdateCartProductQtyVariables {
  productId: string
  qty: number
  size: string
}
