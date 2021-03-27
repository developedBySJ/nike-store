import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp(
    $dateOfBirth: DateTime!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    signUp(
      SignUpInput: {
        dateOfBirth: $dateOfBirth
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      avatar
      firstName
      email
      firstName
      id
      isAdmin
      lastName
      didRequest
    }
  }
`

export { SIGN_UP }