import {gql} from '@apollo/client'

const GET_ORDERS = gql`
  query GetOrders(
    $dateRange: [String!]
    $limit: Int = 8
    $page: Int = 1
    $sortBy: SortOrderBy
    $status: OrderStatus
  ) {
    getOrders(
      OrderFilter: {
        dateRange: $dateRange
        limit: $limit
        page: $page
        sortBy: $sortBy
        status: $status
      }
    ) {
      createdAt
      deliveredAt
      id
      memberId
      paidAt
      payment {
        id
      }
      products {
        id
        name
        slug
        size
        qty
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
export {GET_ORDERS}
