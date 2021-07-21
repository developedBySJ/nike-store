import * as yup from 'yup'

// address: {
//   addressLine1: string | null;
//   city: string | null;
//   country: string | null;
//   postalCode: number | null;
// } | null;
// avatar: string | null;
// createdAt: any;
// dateOfBirth: any;
// email: string;
// firstName: string;
// id: string;
// isAdmin: boolean;
// lastName: string;

const addressValidationSchema = yup.object({
  addressLine1: yup
    .string()
    .min(3, 'AddressLine should be of minimum 3 characters length')
    .max(30, 'AddressLine should be of maximum 30 characters length')
    .required('Address is required'),
  city: yup
    .string()
    .min(3, 'City should be of minimum 3 characters length')
    .max(15, 'City should be of maximum 15 characters length')
    .required('City is required'),
  country: yup
    .string()
    .min(3, 'Country should be of minimum 3 characters length')
    .max(15, 'Country should be of maximum 15 characters length')
    .required('Country is required'),
  postalCode: yup.number().required(),
})

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  firstName: yup
    .string()
    .min(3, 'First Name should be of minimum 3 characters length')
    .required('First Name is required'),
  lastName: yup
    .string()
    .min(3, 'Last Name should be of minimum 3 characters length')
    .required('Last Name is required'),
  dateOfBirth: yup.date().required('Birth Date is required'),
  address: addressValidationSchema,
})
export {validationSchema, addressValidationSchema}
