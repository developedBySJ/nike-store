import { JwtPayload } from "src/auth/types";
import { SortReviewsBy } from "./review.input";

export interface IReviewMember {
  id: string
  firstName: string
  lastName: string
  avatar?: string
}

export interface ICreateReview {
  member: JwtPayload;
  productId: string;
  comment: string;
  rating: number;
}

export interface IUpdateReview {
  viewer: JwtPayload;
  reviewId: string;
  data: {
    comment: string;
    rating: number
  }
}
export interface IReviewFilter {
  limit?: number;
  page?: number;
  productId?: string;
  sortBy?: SortReviewsBy;
}

export interface IPreSave {
  productId: string;
  isNew: boolean;
  rating: number;
  prevRating: number;
}