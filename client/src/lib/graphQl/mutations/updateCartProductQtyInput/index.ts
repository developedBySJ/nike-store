import { gql } from "@apollo/client";

const UPDATE_CART_PRODUCT_QTY = gql`
  mutation UpdateCartProductQty($productId: ID!,$qty:Int!,$size:String!) {
    updateCartProductQty(UpdateCartProductQtyInput:{id:$productId,qty:$qty,size:$size}) {
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

export { UPDATE_CART_PRODUCT_QTY }