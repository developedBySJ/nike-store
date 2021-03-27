/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveFromFavourites
// ====================================================

export interface RemoveFromFavourites_removeFromFavourites_products {
  __typename: "FavouriteProduct";
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  slug: string;
}

export interface RemoveFromFavourites_removeFromFavourites {
  __typename: "Favourite";
  products: RemoveFromFavourites_removeFromFavourites_products[];
  createdAt: string;
  id: string;
  memberId: string;
}

export interface RemoveFromFavourites {
  removeFromFavourites: RemoveFromFavourites_removeFromFavourites;
}

export interface RemoveFromFavouritesVariables {
  id: string;
}
