import { gql } from "@apollo/client";

const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    getOrder(id: $id) {
      createdAt
      deliveredAt
      id
      memberId
      paidAt
      payment {
        customerName
        email
        id
        status
        method
      }
      products {
        description
        id
        name
        price
        image
        qty
        size
        slug
      }
      shippingAddress {
        addressLine1
        city
        country
        postalCode
      }
      tax
      totalPrice
    }
  }
`

export { GET_ORDER_BY_ID }