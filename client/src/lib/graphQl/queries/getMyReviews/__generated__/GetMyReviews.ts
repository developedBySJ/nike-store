/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortReviewsBy } from "./../../../globaltypes";

// ====================================================
// GraphQL query operation: GetMyReviews
// ====================================================

export interface GetMyReviews_getMyReviews_member {
  __typename: "ReviewMember";
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export interface GetMyReviews_getMyReviews {
  __typename: "Review";
  comment: string;
  createdAt: any;
  id: string;
  member: GetMyReviews_getMyReviews_member;
  productId: string;
  productSlug: string;
  rating: number;
}

export interface GetMyReviews {
  getMyReviews: GetMyReviews_getMyReviews[];
}

export interface GetMyReviewsVariables {
  limit?: number | null;
  page?: number | null;
  productId: string;
  sortBy?: SortReviewsBy | null;
}
