import {gql} from '@apollo/client'

const ADD_TO_FAVOURITE = gql`
  mutation AddToFavourite($productId: ID!) {
    addToFavourites(productId: $productId) {
      id
      products {
        id
        description
        image
        name
        price
        slug
      }
    }
  }
`

export {ADD_TO_FAVOURITE}
