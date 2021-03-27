/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout_logOut {
  __typename: "Viewer";
  avatar: string | null;
  didRequest: boolean;
  email: string | null;
  firstName: string | null;
  id: string | null;
  isAdmin: boolean | null;
  lastName: string | null;
}

export interface Logout {
  logOut: Logout_logOut;
}
