import { gql } from "@apollo/client";

const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $qty: Int!, $size: String!) {
    addToCart(CartProductInput: { id: $productId, qty: $qty, size: $size }) {
      products {
        id
        image
        name
        description
        price
        qty
        size
        slug
      }
    }
  }
`

export { ADD_TO_CART }