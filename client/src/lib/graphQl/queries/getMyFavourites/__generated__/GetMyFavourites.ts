/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyFavourites
// ====================================================

export interface GetMyFavourites_getMyFavourites_products {
  __typename: 'FavouriteProduct'
  description: string
  id: string
  image: string
  name: string
  price: number
  slug: string
}

export interface GetMyFavourites_getMyFavourites {
  __typename: 'Favourite'
  createdAt: string
  id: string
  products: GetMyFavourites_getMyFavourites_products[]
}

export interface GetMyFavourites {
  getMyFavourites: GetMyFavourites_getMyFavourites
}
