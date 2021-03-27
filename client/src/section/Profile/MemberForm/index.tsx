import React from "react";
import { useFormik } from "formik";
import {
  GetMemberById,
  GetMemberByIdVariables,
  GetMemberById_getMemberById,
  GetMemberById_getMemberById_address,
} from "../../../lib/graphQl/queries/getMemberById/__generated__/GetMemberById";
import { validationSchema } from "./validationSchema";
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { DatePicker } from "baseui/datepicker";
import { H5, H6, Paragraph1 } from "baseui/typography";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { useMutation } from "@apollo/client";
import { UPDATE_MEMBER_BY_ID } from "../../../lib/graphQl/mutations/updateMemberById";
import {
  UpdateMemberById,
  UpdateMemberByIdVariables,
} from "../../../lib/graphQl/mutations/updateMemberById/__generated__/UpdateMemberById";
import { useSnackbar } from "baseui/snackbar";
import { displayNotification } from "../../../lib/utils/displayNotification";
import { GET_MEMBER_BY_ID } from "../../../lib/graphQl/queries/getMemberById";
import { Avatar } from "baseui/avatar";
import { StyledLink } from "baseui/link";

interface IIntialValue {
  address: GetMemberById_getMemberById_address;
  avatar: string | null;
  createdAt: any;
  dateOfBirth: any;
  email: string;
  firstName: string;
  id: string;
  isAdmin: boolean;
  lastName: string;
}

interface IMemberFormProps {
  initialValues: GetMemberById_getMemberById;
}

const MemberForm = ({ initialValues }: IMemberFormProps) => {
  const [css, theme] = useStyletron();
  const { enqueue } = useSnackbar();
  const [updateMember, { data, loading, error }] = useMutation<
    UpdateMemberById,
    UpdateMemberByIdVariables
  >(UPDATE_MEMBER_BY_ID, {
    onError: () => {
      displayNotification(
        "negative",
        "Sorry,currently we are unable to update your profile! :("
      );
    },
    variables: {
      id: initialValues.id,
    },
    onCompleted: () => {
      enqueue({ message: "Profile Updated Successfully!" });
    },
    update: (cache, { data: newData }) => {
      if (newData) {
        cache.writeQuery<GetMemberById, GetMemberByIdVariables>({
          query: GET_MEMBER_BY_ID,
          data: {
            getMemberById: newData.updateMember,
          },
        });
      }
    },
  });

  const intialAddress: GetMemberById_getMemberById_address = initialValues.address
    ? initialValues.address
    : {
        __typename: "Address",
        addressLine1: "",
        city: "",
        country: "",
        postalCode: 0,
      };

  const formik = useFormik<IIntialValue>({
    initialValues: {
      ...initialValues,
      address: intialAddress,
    },
    validationSchema,
    onSubmit: (e) => {
      const address = e.address && { ...e.address, __typename: undefined };
      const variables = { ...e, address, __typename: undefined };
      updateMember({
        variables,
      });
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const formOverrides = {
    style: { marginBottom: theme.sizing.scale900 },
  };

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) =>
    validity.valid &&
    updateMember({ variables: { id: initialValues.id, avatar: file } });

  const disableBtn = !!(
    !formik.dirty ||
    formik.errors.address?.addressLine1 ||
    formik.errors.address?.city ||
    formik.errors.address?.country ||
    formik.errors.address?.postalCode ||
    formik.errors.avatar ||
    formik.errors.createdAt ||
    formik.errors.dateOfBirth ||
    formik.errors.email ||
    formik.errors.firstName ||
    formik.errors.id ||
    formik.errors.isAdmin ||
    formik.errors.lastName
  );
  return (
    <Block margin="2.5rem auto" padding="2.5rem 0" maxWidth="600px">
      <H5 marginBottom="2rem">Account Details</H5>
      <Block
        $style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          src={data?.updateMember.avatar || initialValues.avatar || undefined}
          name={initialValues.firstName}
          size="128px"
        />
        <label htmlFor="avatar">
          <StyledLink
            style={{ margin: "1rem", display: "block", cursor: "pointer" }}
          >
            Edit
          </StyledLink>
          <input
            id="avatar"
            name={"avatar"}
            type={"file"}
            placeholder="Choose Avatar"
            onChange={onChange}
            accept="image/png, image/jpeg"
            className={css({ display: "none" })}
            multiple={false}
          />
        </label>
      </Block>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          error={formik.touched.email && formik.errors.email}
          label="Email"
          overrides={{
            ControlContainer: formOverrides,
          }}
        >
          <Input
            id="email"
            name="email"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            onChange={formik.handleChange}
            placeholder="Email"
            clearOnEscape
            disabled
          />
        </FormControl>

        <FormControl
          label="First Name"
          error={formik.touched.firstName && formik.errors.firstName}
          overrides={{
            ControlContainer: formOverrides,
          }}
        >
          <Input
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            placeholder="First Name"
            clearOnEscape
          />
        </FormControl>
        <FormControl
          label="Last Name"
          error={formik.touched.lastName && formik.errors.lastName}
          overrides={{
            ControlContainer: formOverrides,
          }}
        >
          <Input
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            placeholder="Last Name"
            clearOnEscape
          />
        </FormControl>
        <FormControl
          label="Date of Birth"
          error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
        >
          <DatePicker
            placeholder="Date Of Birth"
            overrides={{ Input: { props: { id: "dateOfBirth" } } }}
            value={new Date(formik.values.dateOfBirth)}
            minDate={new Date("01/01/1900")}
            onChange={({ date }) => {
              const dateValue = date;
              if (dateValue instanceof Date) {
                formik.setFieldValue("dateOfBirth", dateValue);
              }
            }}
            onClose={() => formik.validateField("dateOfBirth")}
          />
        </FormControl>
        <H5 margin="2rem 0" marginTop="4rem">
          Address
        </H5>
        <FormControl
          label="Address Line 1"
          error={
            formik.touched.address?.addressLine1 &&
            formik.errors.address?.addressLine1
          }
          overrides={{
            ControlContainer: formOverrides,
          }}
        >
          <Input
            id="addressLine1"
            name="address.addressLine1"
            value={formik.values.address?.addressLine1 || ""}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            error={
              formik.touched.address?.addressLine1 &&
              Boolean(formik.errors.address?.addressLine1)
            }
            placeholder="Address Line 1"
            clearOnEscape
          />
        </FormControl>
        <FormControl
          label="City"
          error={formik.touched.address?.city && formik.errors.address?.city}
          overrides={{
            ControlContainer: formOverrides,
          }}
        >
          <Input
            id="city"
            name="address.city"
            value={formik.values.address?.city || ""}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            error={
              formik.touched.address?.city &&
              Boolean(formik.errors.address?.city)
            }
            placeholder="City"
            clearOnEscape
          />
        </FormControl>
        <FormControl
          label="Postal Code"
          error={
            formik.touched.address?.postalCode &&
            formik.errors.address?.postalCode
          }
          overrides={{
            ControlContainer: formOverrides,
          }}
        >
          <Input
            id="postalCode"
            name="address.postalCode"
            value={formik.values.address?.postalCode || ""}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            error={
              formik.touched.address?.postalCode &&
              Boolean(formik.errors.address?.postalCode)
            }
            placeholder="Postal Code"
            clearOnEscape
          />
        </FormControl>
        <FormControl
          label="Country"
          error={
            formik.touched.address?.country && formik.errors.address?.country
          }
          overrides={{
            ControlContainer: formOverrides,
          }}
        >
          <Input
            id="country"
            name="address.country"
            value={formik.values.address?.country || ""}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            error={
              formik.touched.address?.country &&
              Boolean(formik.errors.address?.country)
            }
            placeholder="country"
            clearOnEscape
          />
        </FormControl>

        <Button
          disabled={disableBtn}
          isLoading={loading}
          size="large"
          $style={{ width: "100%" }}
        >
          Update
        </Button>
      </form>
    </Block>
  );
};

export { MemberForm };
