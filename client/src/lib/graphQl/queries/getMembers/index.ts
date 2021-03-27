import { gql } from "@apollo/client";

const GET_MEMBERS = gql`
  query GetMembers($limit: Int, $page: Int) {
    getMembers(MemberFilter: { limit: $limit, page: $page }) {
      id
      firstName
      lastName
      email
      dateOfBirth
      isAdmin
    }
  }
`

export { GET_MEMBERS }