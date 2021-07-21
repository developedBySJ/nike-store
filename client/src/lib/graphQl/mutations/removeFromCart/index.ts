import {gql} from '@apollo/client'

const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: ID!, $size: String!) {
    removeFromCart(productId: $productId, size: $size) {
      id
      createdAt
      products {
        description
        id
        image
        name
        price
        qty
        size
        slug
      }
    }
  }
`

export {REMOVE_FROM_CART}
