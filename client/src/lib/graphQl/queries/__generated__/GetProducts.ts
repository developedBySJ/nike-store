/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {SortProductBy} from './../../globaltypes'

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_getProducts {
  __typename: 'Product'
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  description: string
}

export interface GetProducts {
  getProducts: GetProducts_getProducts[]
}

export interface GetProductsVariables {
  category?: string | null
  limit?: number | null
  material?: string | null
  page?: number | null
  priceRange?: number[] | null
  ratings?: number | null
  size?: string | null
  sortBy?: SortProductBy | null
  searchQuery?: string | null
}
