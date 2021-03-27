import { gql } from "@apollo/client";

const GET_MEMBER_BY_ID = gql`
  query GetMemberById($id: ID!) {
    getMemberById(id: $id) {
      address {
        addressLine1
        city
        country
        postalCode
      }
      avatar
      createdAt
      dateOfBirth
      email
      firstName
      id
      isAdmin
      lastName
    }
  }

`

export { GET_MEMBER_BY_ID }