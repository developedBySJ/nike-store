import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {FormControl} from 'baseui/form-control'
import {Input} from 'baseui/input'
import {Label1, Paragraph1} from 'baseui/typography'
import {useFormik} from 'formik'
import React from 'react'
import {AddressInput} from '../../../../lib/graphQl/globaltypes'
import {addressValidationSchema} from '../../../Profile/MemberForm/validationSchema'

const DeliveryOption = ({
  address,
  setAddress,
  setDisablePayments,
}: {
  address: AddressInput
  setAddress: (e: AddressInput) => void
  setDisablePayments: (e: boolean) => void
}) => {
  // console.log({address})
  const [css, theme] = useStyletron()

  const [disabled, setDisabled] = React.useState(true)

  const formik = useFormik({
    initialValues: address,
    validationSchema: addressValidationSchema,
    onSubmit: (e) => {
      setAddress(e)
      setDisablePayments(false)
    },
    validateOnChange: true,
    validateOnBlur: true,
  })

  const formOverrides = disabled
    ? {
        ControlContainer: {style: {marginBottom: 0}},
      }
    : {
        ControlContainer: {
          style: {marginBottom: theme.sizing.scale500},
        },
      }

  const inputOverrides = disabled
    ? {
        Root: {style: {border: '1px solid #fff'}},
        Input: {
          style: {backgroundColor: '#fff', border: 'none', color: '#111'},
        },
      }
    : {}
  const size = disabled ? 'compact' : 'default'

  const isValid = !(
    formik.errors.addressLine1 ||
    formik.errors.city ||
    formik.errors.city ||
    formik.errors.postalCode
  )

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Block
          display="flex"
          justifyContent="space-between"
          backgroundColor="#111"
        >
          <Label1 padding="0.75rem 0 0.75rem 2rem" color="#f7f7f7">
            1. DELIVERY OPTIONS
          </Label1>
          <Button $style={{padding: '0px'}}>
            <Label1
              padding="0.75rem 2rem"
              color="#d3d3d3"
              overrides={{
                Block: {
                  props: {
                    onClick: () => {
                      if (!isValid) {
                        setDisablePayments(true)
                      }
                      setDisabled((prev) => !prev)
                    },
                  },
                },
              }}
              className={css({
                cursor: 'pointer',
                textDecoration: 'underline',
              })}
            >
              {disabled ? 'Edit' : 'Save'}
            </Label1>
          </Button>
        </Block>
        <Paragraph1 margin="1rem 0">Shipping Address</Paragraph1>

        <FormControl
          label={disabled ? '' : 'Address Line 1'}
          error={formik.touched.addressLine1 && formik.errors.addressLine1}
          overrides={{
            ...formOverrides,
          }}
        >
          <Input
            disabled={disabled}
            size={size}
            id="addressLine1"
            name="addressLine1"
            value={formik.values?.addressLine1 || ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            overrides={inputOverrides}
            error={
              formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)
            }
            placeholder="Address Line 1"
            clearOnEscape
          />
        </FormControl>
        <FormControl
          label={disabled ? '' : 'City'}
          error={formik.touched.city && formik.errors.city}
          overrides={{
            ...formOverrides,
          }}
        >
          <Input
            disabled={disabled}
            size={size}
            id="city"
            name="city"
            value={formik.values?.city || ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            overrides={inputOverrides}
            error={formik.touched.city && Boolean(formik.errors.city)}
            placeholder="City"
            clearOnEscape
          />
        </FormControl>
        <FormControl
          label={disabled ? '' : 'Postal Code'}
          error={formik.touched.postalCode && formik.errors.postalCode}
          overrides={{
            ...formOverrides,
          }}
        >
          <Input
            disabled={disabled}
            size={size}
            id="postalCode"
            name="postalCode"
            value={formik.values?.postalCode || ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            overrides={inputOverrides}
            error={
              formik.touched.postalCode && Boolean(formik.errors.postalCode)
            }
            placeholder="Postal Code"
            clearOnEscape
          />
        </FormControl>
        <FormControl
          label={disabled ? '' : 'Country'}
          // error={formik.touched.lastName && formik.errors.lastName}
          overrides={{
            ...formOverrides,
          }}
        >
          <Input
            disabled={disabled}
            size={size}
            id="country"
            name="country"
            value={formik.values?.country || ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            overrides={inputOverrides}
            // error={formik.touched.address && Boolean(formik.errors.lastName)}
            placeholder="country"
            clearOnEscape
          />
        </FormControl>
      </form>
    </>
  )
}

export {DeliveryOption}
