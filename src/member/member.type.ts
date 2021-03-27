import { FileUpload } from 'graphql-upload'

import { SortMemberBy } from './member.input'

export interface IAddress {
  addressLine1: string;
  city: string;
  postalCode: number;
  country: string;
}

export interface IUpdateMemberData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  currPassword?: string;
  newPassword?: string;
  isAdmin?: boolean;
  avatar?: { file: FileUpload } | {
    promise: Promise<FileUpload>;
  }[];
  address?: IAddress;
}

export interface IMemberFilter {
  limit?: number;
  page?: number;
  sortBy?: SortMemberBy
}