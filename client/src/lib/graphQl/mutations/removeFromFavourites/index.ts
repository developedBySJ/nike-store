import { gql } from "@apollo/client";

const REMOVE_FROM_FAVOURITES = gql`
  mutation RemoveFromFavourites($id: ID!) {
    removeFromFavourites(productId: $id) {
      products {
        description
        id
        image
        name
        price
        slug
      }
      createdAt
      id
      memberId
    }
  }
`

export { REMOVE_FROM_FAVOURITES }