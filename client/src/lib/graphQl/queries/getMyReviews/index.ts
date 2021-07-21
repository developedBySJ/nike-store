import {gql} from '@apollo/client'

const GET_MY_REVIEWS = gql`
  query GetMyReviews(
    $limit: Int = 1
    $page: Int = 1
    $productId: ID!
    $sortBy: SortReviewsBy
  ) {
    getMyReviews(
      ReviewsFilter: {
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

export {GET_MY_REVIEWS}
