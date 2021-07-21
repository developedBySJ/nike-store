import {gql} from '@apollo/client'

const UPDATE_MEMBER_BY_ID = gql`
  mutation UpdateMemberById(
    $address: AddressInput
    $avatar: Upload
    $currPassword: String
    $dateOfBirth: String
    $firstName: String
    $id: ID!
    $isAdmin: Boolean
    $lastName: String
    $newPassword: String
  ) {
    updateMember(
      UpdateUserInput: {
        address: $address
        avatar: $avatar
        currPassword: $currPassword
        dateOfBirth: $dateOfBirth
        firstName: $firstName
        id: $id
        isAdmin: $isAdmin
        lastName: $lastName
        newPassword: $newPassword
      }
    ) {
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
export {UPDATE_MEMBER_BY_ID}
