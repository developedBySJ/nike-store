/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMembers
// ====================================================

export interface GetMembers_getMembers {
  __typename: 'Member'
  id: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: any
  isAdmin: boolean
}

export interface GetMembers {
  getMembers: GetMembers_getMembers[]
}

export interface GetMembersVariables {
  limit?: number | null
  page?: number | null
}
