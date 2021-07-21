import {gql} from '@apollo/client'

const LOG_OUT = gql`
  mutation Logout {
    logOut {
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
export {LOG_OUT}
