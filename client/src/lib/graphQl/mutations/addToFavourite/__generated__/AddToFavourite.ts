/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToFavourite
// ====================================================

export interface AddToFavourite_addToFavourites_products {
  __typename: 'FavouriteProduct'
  id: string
  description: string
  image: string
  name: string
  price: number
  slug: string
}

export interface AddToFavourite_addToFavourites {
  __typename: 'Favourite'
  id: string
  products: AddToFavourite_addToFavourites_products[]
}

export interface AddToFavourite {
  addToFavourites: AddToFavourite_addToFavourites
}

export interface AddToFavouriteVariables {
  productId: string
}
