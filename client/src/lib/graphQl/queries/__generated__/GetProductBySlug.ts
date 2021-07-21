/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductBySlug
// ====================================================

export interface GetProductBySlug_getProductBySlug_reviews_member {
  __typename: 'ReviewMember'
  avatar: string | null
  firstName: string
  id: string
  lastName: string
}

export interface GetProductBySlug_getProductBySlug_reviews {
  __typename: 'ProductReview'
  comment: string
  id: string
  createdAt: any
  member: GetProductBySlug_getProductBySlug_reviews_member
  rating: number
}

export interface GetProductBySlug_getProductBySlug {
  __typename: 'Product'
  availableStock: number
  brand: string
  category: string
  createdAt: string
  description: string
  details: string
  fit: string[]
  id: string
  images: string[]
  material: string | null
  mrp: number
  name: string
  numOfReviews: number
  price: number
  ratings: number
  reviews: GetProductBySlug_getProductBySlug_reviews[] | null
  size: string[]
  slug: string
}

export interface GetProductBySlug {
  getProductBySlug: GetProductBySlug_getProductBySlug
}

export interface GetProductBySlugVariables {
  slug: string
}
