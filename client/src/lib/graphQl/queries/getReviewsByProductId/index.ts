import { gql } from "@apollo/client";

const GET_REVIEWS_BY_PRODUCT_ID = gql`
  query GetReviewsByProductId(
    $limit: Int = 8
    $page: Int = 1
    $productId: ID!
    $sortBy: SortReviewsBy
  ) {
    getReviews(
      GetReviewsInput: {
        limit: $limit
        page: $page
        productId: $productId
        sortBy: $sortBy
      }
    ) {
      comment
      createdAt
      id
      member {
        id
        firstName
        lastName
        avatar
      }
      productId
      productSlug
      rating
    }
  }
`

export { GET_REVIEWS_BY_PRODUCT_ID }