import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email:String!,$password:String!){
    login(LoginInput:{email:$email,password:$password}){
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

export { LOGIN }