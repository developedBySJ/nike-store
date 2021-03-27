import React from "react";
import { Input } from "baseui/input";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../lib/graphQl/queries";
import {
  Login,
  Login_login,
} from "../../../lib/graphQl/mutations/login/__generated__/Login";
import { DatePicker } from "baseui/datepicker";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { Paragraph3, Paragraph4 } from "baseui/typography";
import { useSnackbar } from "baseui/snackbar";
import { Check } from "baseui/icon";
import { Redirect, useHistory } from "react-router-dom";
import { toaster } from "baseui/toast";
import { Viewer } from "../../../lib/types";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormControl } from "baseui/form-control";
import { displayNotification } from "../../../lib/utils/displayNotification";
import { SignUp } from "../../../lib/graphQl/mutations/signUp/__generated__/SignUp";
import { SIGN_UP } from "../../../lib/graphQl/mutations/signUp";
import { sign } from "crypto";
interface ILoginFormProps {
  setViewer: (data: Viewer) => void;
}

interface IRegisterForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth?: Date;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: yup
    .string()
    .min(3, "First Name should be of minimum 3 characters length")
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(3, "Last Name should be of minimum 3 characters length")
    .required("Last Name is required"),
  dateOfBirth: yup.date().required("Birth Date is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const RegisterForm = ({ setViewer }: ILoginFormProps) => {
  const [css, theme] = useStyletron();
  const { enqueue } = useSnackbar();
  const histroy = useHistory();

  const [signUp, { data, error, loading }] = useMutation<SignUp>(SIGN_UP, {
    onCompleted: ({ signUp }) => {
      enqueue({
        message: `Welcome To Nike, ${signUp.firstName} ${signUp.lastName}`,
      });
      setViewer(signUp);
      histroy.push("/");
    },
    onError: (error) => {
      displayNotification("negative", error.message);
    },
  });

  const formik = useFormik<IRegisterForm>({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signUp({ variables: values });
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const disableBtn = !!(
    !formik.dirty ||
    formik.errors.email ||
    formik.errors.password ||
    formik.errors.firstName ||
    formik.errors.lastName ||
    formik.errors.dateOfBirth
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        error={formik.touched.email && formik.errors.email}
        overrides={{
          ControlContainer: {
            style: { marginBottom: theme.sizing.scale600 },
          },
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
        />
      </FormControl>
      <FormControl
        error={formik.touched.password && formik.errors.password}
        overrides={{
          ControlContainer: {
            style: { marginBottom: theme.sizing.scale600 },
          },
        }}
      >
        <Input
          id="password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          placeholder="Password"
          clearOnEscape
        />
      </FormControl>
      <FormControl
        error={formik.touched.firstName && formik.errors.firstName}
        overrides={{
          ControlContainer: {
            style: { marginBottom: theme.sizing.scale600 },
          },
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
        error={formik.touched.lastName && formik.errors.lastName}
        overrides={{
          ControlContainer: {
            style: { marginBottom: theme.sizing.scale600 },
          },
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
        error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
      >
        <DatePicker
          placeholder="Date Of Birth"
          overrides={{ Input: { props: { id: "dateOfBirth" } } }}
          value={formik.values.dateOfBirth}
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

      <Paragraph4
        width="70%"
        margin="8px auto"
        marginBottom="32px"
        $style={{ textAlign: "center", opacity: 0.6, letterSpacing: "0.7px" }}
      >
        By logging in, you agree to Nike's Privacy Policy and Terms of Use.
      </Paragraph4>
      <Button
        isLoading={loading}
        overrides={{
          Root: {
            style: { width: "100%", marginBottom: theme.sizing.scale600 },
          },
        }}
        disabled={disableBtn}
      >
        REGISTER
      </Button>
    </form>
  );
};

export { RegisterForm };
