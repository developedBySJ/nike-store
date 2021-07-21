/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: 'Viewer'
  avatar: string | null
  firstName: string | null
  email: string | null
  id: string | null
  isAdmin: boolean | null
  lastName: string | null
  didRequest: boolean
}

export interface Login {
  login: Login_login
}

export interface LoginVariables {
  email: string
  password: string
}
