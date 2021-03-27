import { gql } from "@apollo/client";

const GET_MY_CART = gql`
  query GetMyCart {
    getMyCart {
      id
      products {
        description
        image
        name
        price
        qty
        size
        slug
        id
      }
    }
  }

`

export { GET_MY_CART }