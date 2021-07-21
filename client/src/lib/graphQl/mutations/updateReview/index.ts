import {gql} from '@apollo/client'

const UPDATE_REVIEW = gql`
  mutation UpdateReview($comment: String, $reviewId: ID!, $rating: Int) {
    updateReview(
      UpdateReviewInput: {
        comment: $comment
        reviewId: $reviewId
        rating: $rating
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
export {UPDATE_REVIEW}
