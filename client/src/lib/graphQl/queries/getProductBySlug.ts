import {gql} from '@apollo/client'

const GET_PRODUCT_BY_ID = gql`
  query GetProductBySlug($slug: String!) {
    getProductBySlug(slug: $slug) {
      availableStock
      brand
      category
      createdAt
      description
      details
      fit
      id
      images
      material
      mrp
      name
      numOfReviews
      price
      ratings
      reviews {
        comment
        id
        createdAt
        member {
          avatar
          firstName
          id
          lastName
        }
        rating
      }
      size
      slug
    }
  }
`

export {GET_PRODUCT_BY_ID}
