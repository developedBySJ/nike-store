import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import {StripeCardElementChangeEvent} from '@stripe/stripe-js'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {FormControl} from 'baseui/form-control'
import {Notification} from 'baseui/notification'
import {Label1, Label2, Paragraph1, Paragraph2} from 'baseui/typography'
import React, {FormEvent} from 'react'
import {displayNotification} from '../../../../lib/utils/displayNotification'
import {formatPrice} from '../../../../lib/utils/formatPrice'

const StripeForm = ({
  total,
  onSubmit,
  disablePayments,
}: {
  total: number
  onSubmit: (token?: string) => void
  disablePayments: boolean
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [disabled, setDisabled] = React.useState(true)
  const [error, setError] = React.useState<
    StripeCardElementChangeEvent['error']
  >(undefined)

  const [css, theme] = useStyletron()
  const handleSubmit = async (event: FormEvent) => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      return
    }
    // Use your card Element with other Stripe.js APIs
    const {error, token} = await stripe.createToken(cardElement)

    if (error) {
      displayNotification(
        'negative',
        error.message || 'Unable to Process Payments!',
      )
    } else {
      onSubmit(token?.id)
      // console.log("[TOKEN]", token);
    }
  }

  return (
    <>
      <Label1 padding="0.75rem 2rem" color="#f7f7f7" backgroundColor="#111">
        2. PAYMENT OPTION
      </Label1>
      {disablePayments && (
        <Notification kind="negative">
          Enter Valid Address To Continue
        </Notification>
      )}
      <Block
        className={css({
          ...(disablePayments && {opacity: 0.5, cursor: 'not-allowed'}),
        })}
      >
        <Notification
          closeable
          overrides={{
            Body: {
              style: {width: 'auto', fontSize: '1rem', lineHeight: '1.5rem'},
            },
          }}
        >
          Testing Credentials
          <br />
          Card Number : 4242 4242 4242 4242
          <br />
          Exp Date : Any Future Date
          <br />
          CVC : Any 3 Digit Number
          <br />
        </Notification>

        <Block margin="1rem 0" padding="1rem 0">
          <form onSubmit={handleSubmit}>
            <FormControl error={error?.message}>
              <Block
                width={['100%', '100%', '60%', '50%']}
                backgroundColor="#f7f7f7"
              >
                <CardElement
                  className={css({padding: '1rem'})}
                  onChange={(e) => {
                    setError(e.error)
                    setDisabled(!e.complete)
                  }}
                  options={{
                    hidePostalCode: true,
                    iconStyle: 'solid',
                    style: {
                      base: {
                        color: '#111111',

                        fontFamily: 'Arial, sans-serif',
                        fontSmoothing: 'antialiased',
                        fontSize: '16px',
                        '::placeholder': {
                          color: '#111111',
                        },
                      },
                      invalid: {
                        color: '#fa755a',
                        iconColor: '#fa755a',
                      },
                    },
                  }}
                />
              </Block>
            </FormControl>
            <Button
              disabled={disabled || disablePayments}
              $style={{margin: '2rem 0', padding: '1rem 4rem'}}
            >
              PAY &nbsp; {!disabled && formatPrice(total)}
            </Button>
          </form>
        </Block>
      </Block>
    </>
  )
}

export {StripeForm}
