import { gql } from "@apollo/client";

const GET_MY_ORDER = gql`
query GetMyOrders(
  $dateRange: [String!]
  $limit: Int = 8
  $page: Int = 1
  $sortBy: SortOrderBy
  $status: OrderStatus
) {
  getMyOrders(
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
    paidAt
    products {
      id
      image
    }
    totalPrice
  }
}

`

export { GET_MY_ORDER }