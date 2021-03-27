/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortReviewsBy } from "./../../../globaltypes";

// ====================================================
// GraphQL query operation: GetReviewsByProductId
// ====================================================

export interface GetReviewsByProductId_getReviews_member {
  __typename: "ReviewMember";
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export interface GetReviewsByProductId_getReviews {
  __typename: "Review";
  comment: string;
  createdAt: any;
  id: string;
  member: GetReviewsByProductId_getReviews_member;
  productId: string;
  productSlug: string;
  rating: number;
}

export interface GetReviewsByProductId {
  getReviews: GetReviewsByProductId_getReviews[];
}

export interface GetReviewsByProductIdVariables {
  limit?: number | null;
  page?: number | null;
  productId: string;
  sortBy?: SortReviewsBy | null;
}
