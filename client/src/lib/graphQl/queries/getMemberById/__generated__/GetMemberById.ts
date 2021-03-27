/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMemberById
// ====================================================

export interface GetMemberById_getMemberById_address {
  __typename: "Address";
  addressLine1: string;
  city: string;
  country: string;
  postalCode: number;
}

export interface GetMemberById_getMemberById {
  __typename: "Member";
  address: GetMemberById_getMemberById_address | null;
  avatar: string | null;
  createdAt: any;
  dateOfBirth: any;
  email: string;
  firstName: string;
  id: string;
  isAdmin: boolean;
  lastName: string;
}

export interface GetMemberById {
  getMemberById: GetMemberById_getMemberById;
}

export interface GetMemberByIdVariables {
  id: string;
}
