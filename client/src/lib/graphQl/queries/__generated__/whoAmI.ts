/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: whoAmI
// ====================================================

export interface whoAmI_whoAmI {
  __typename: "Viewer";
  avatar: string | null;
  didRequest: boolean;
  email: string | null;
  firstName: string | null;
  id: string | null;
  isAdmin: boolean | null;
  lastName: string | null;
}

export interface whoAmI {
  whoAmI: whoAmI_whoAmI;
}
