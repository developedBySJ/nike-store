/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateReview
// ====================================================

export interface CreateReview_createReview_member {
  __typename: "ReviewMember";
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export interface CreateReview_createReview {
  __typename: "Review";
  comment: string;
  createdAt: any;
  id: string;
  member: CreateReview_createReview_member;
  productId: string;
  productSlug: string;
  rating: number;
}

export interface CreateReview {
  createReview: CreateReview_createReview;
}

export interface CreateReviewVariables {
  comment: string;
  productId: string;
  rating: number;
}
