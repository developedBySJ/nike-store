import { gql } from "@apollo/client";

const UPDATE_ORDER = gql`
  mutation UpdateOrder($orderId: ID!) {
    updateOrder(orderId: $orderId) {
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

export { UPDATE_ORDER }