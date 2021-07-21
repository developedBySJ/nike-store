/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export enum SortOrderBy {
  NEWEST_FIRST = 'NEWEST_FIRST',
  OLDEST_FIRST = 'OLDEST_FIRST',
  STATUS = 'STATUS',
  TOTAL_PRICE_HIGH_TO_LOW = 'TOTAL_PRICE_HIGH_TO_LOW',
  TOTAL_PRICE_LOW_TO_HIGH = 'TOTAL_PRICE_LOW_TO_HIGH',
}

export enum SortProductBy {
  FEATURED = 'FEATURED',
  NEWEST = 'NEWEST',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
}

export enum SortReviewsBy {
  NEWEST = 'NEWEST',
  RATING_HIGH_TO_LOW = 'RATING_HIGH_TO_LOW',
  RATING_LOW_TO_HIGH = 'RATING_LOW_TO_HIGH',
}

export interface AddressInput {
  addressLine1: string
  city: string
  country: string
  postalCode: number
}

export interface OrderProducts {
  description: string
  id: string
  image: string
  name: string
  price: number
  qty: number
  size: string
  slug: string
}

//==============================================================
// END Enums and Input Objects
//==============================================================
