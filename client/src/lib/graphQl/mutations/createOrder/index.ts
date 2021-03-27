import { gql } from "@apollo/client";

const CREATE_ORDER = gql`
  mutation CreateOrder(
    $products: [OrderProducts!]!
    $shippingAddress: AddressInput!
    $stripeToken: String!
    $tax: Float!
    $totalPrice: Float!
  ) {
    createOrder(
      CreateOrderInput: {
        products: $products
        shippingAddress: $shippingAddress
        stripeToken: $stripeToken
        tax: $tax
        totalPrice: $totalPrice
      }
    ) {
      id
      memberId
      paidAt
      payment {
        email
        id
        method
        customerName
        status
      }
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
      shippingAddress {
        addressLine1
        city
        country
        postalCode
      }
      tax
      totalPrice
      createdAt
  }
}

`

export { CREATE_ORDER }