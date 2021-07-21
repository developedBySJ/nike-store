/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateReview
// ====================================================

export interface UpdateReview_updateReview_member {
  __typename: 'ReviewMember'
  id: string
  firstName: string
  lastName: string
  avatar: string | null
}

export interface UpdateReview_updateReview {
  __typename: 'Review'
  comment: string
  createdAt: any
  id: string
  member: UpdateReview_updateReview_member
  productId: string
  productSlug: string
  rating: number
}

export interface UpdateReview {
  updateReview: UpdateReview_updateReview
}

export interface UpdateReviewVariables {
  comment?: string | null
  reviewId: string
  rating?: number | null
}
