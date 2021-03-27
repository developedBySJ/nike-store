import { gql } from "@apollo/client";

const WHO_AM_I = gql`
query whoAmI {
  whoAmI {
    avatar
    didRequest
    email
    firstName
    id
    isAdmin
    lastName
  }
}
`

export { WHO_AM_I }