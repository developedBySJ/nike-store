/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_signUp {
  __typename: "Viewer";
  avatar: string | null;
  firstName: string | null;
  email: string | null;
  id: string | null;
  isAdmin: boolean | null;
  lastName: string | null;
  didRequest: boolean;
}

export interface SignUp {
  signUp: SignUp_signUp;
}

export interface SignUpVariables {
  dateOfBirth: any;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
