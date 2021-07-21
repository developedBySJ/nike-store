/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {SortProductBy} from './../../../globaltypes'

// ====================================================
// GraphQL query operation: GetProductsComplete
// ====================================================

export interface GetProductsComplete_getProducts {
  __typename: 'Product'
  availableStock: number
  brand: string
  category: string
  createdAt: string
  description: string
  details: string
  fit: string[]
  id: string
  material: string | null
  mrp: number
  name: string
  numOfReviews: number
  price: number
  ratings: number
  size: string[]
  slug: string
}

export interface GetProductsComplete {
  getProducts: GetProductsComplete_getProducts[]
}

export interface GetProductsCompleteVariables {
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
