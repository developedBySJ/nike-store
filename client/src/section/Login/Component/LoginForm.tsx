import React from 'react'
import {Input} from 'baseui/input'
import {useMutation} from '@apollo/client'
import {LOGIN} from '../../../lib/graphQl/queries'
import {Login} from '../../../lib/graphQl/mutations/login/__generated__/Login'
import {useStyletron} from 'baseui'
import {Button} from 'baseui/button'
import {Paragraph4} from 'baseui/typography'
import {useSnackbar} from 'baseui/snackbar'
import {useHistory, useLocation} from 'react-router-dom'

import {Viewer} from '../../../lib/types'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {FormControl} from 'baseui/form-control'
import {displayNotification} from '../../../lib/utils/displayNotification'
interface ILoginFormProps {
  setViewer: (data: Viewer) => void
}

interface ILoginForm {
  email: string
  password: string
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
})

const LoginForm = ({setViewer}: ILoginFormProps) => {
  const [css, theme] = useStyletron()
  const {enqueue} = useSnackbar()
  const histroy = useHistory()
  const location = useLocation()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({values})
      login({variables: values})
    },
    validateOnChange: true,
    validateOnBlur: true,
  })
  const [login, {data, error, loading}] = useMutation<Login>(LOGIN, {
    onCompleted: ({login}) => {
      enqueue({
        message: `Authorized as ${login.firstName} ${login.lastName}`,
      })
      setViewer(login)
      histroy.push('/')
    },
    onError: (error) => {
      displayNotification('negative', error.message)
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        error={formik.touched.email && formik.errors.email}
        overrides={{
          ControlContainer: {
            style: {marginBottom: theme.sizing.scale600},
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
            style: {marginBottom: theme.sizing.scale600},
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
      <Paragraph4
        width="70%"
        margin="8px auto"
        marginBottom="32px"
        $style={{textAlign: 'center', opacity: 0.6, letterSpacing: '0.7px'}}
      >
        By logging in, you agree to Nike's Privacy Policy and Terms of Use.
      </Paragraph4>
      <Button
        isLoading={loading}
        overrides={{
          Root: {
            style: {width: '100%', marginBottom: theme.sizing.scale600},
          },
        }}
        disabled={
          !!(!formik.dirty || formik.errors.email || formik.errors.password)
        }
      >
        LOGIN
      </Button>
    </form>
  )
}

export default LoginForm
