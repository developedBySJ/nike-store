import { gql } from "@apollo/client";

const GET_MY_FAVOURITES = gql`
  query GetMyFavourites{
    getMyFavourites {
      createdAt
      id
      products {
        description
        id
        image
        name
        price
        slug
      }
    }
  }
`

export { GET_MY_FAVOURITES }