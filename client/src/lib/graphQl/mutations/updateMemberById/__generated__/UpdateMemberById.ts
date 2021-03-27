/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressInput } from "./../../../globaltypes";

// ====================================================
// GraphQL mutation operation: UpdateMemberById
// ====================================================

export interface UpdateMemberById_updateMember_address {
  __typename: "Address";
  addressLine1: string;
  city: string;
  country: string;
  postalCode: number;
}

export interface UpdateMemberById_updateMember {
  __typename: "Member";
  address: UpdateMemberById_updateMember_address | null;
  avatar: string | null;
  createdAt: any;
  dateOfBirth: any;
  email: string;
  firstName: string;
  id: string;
  isAdmin: boolean;
  lastName: string;
}

export interface UpdateMemberById {
  updateMember: UpdateMemberById_updateMember;
}

export interface UpdateMemberByIdVariables {
  address?: AddressInput | null;
  avatar?: any | null;
  currPassword?: string | null;
  dateOfBirth?: string | null;
  firstName?: string | null;
  id: string;
  isAdmin?: boolean | null;
  lastName?: string | null;
  newPassword?: string | null;
}
