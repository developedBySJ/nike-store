import {gql} from '@apollo/client'

const CREATE_REVIEW = gql`
  mutation CreateReview($comment: String!, $productId: ID!, $rating: Int!) {
    createReview(
      CreateReviewInput: {
        comment: $comment
        productId: $productId
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

export {CREATE_REVIEW}
