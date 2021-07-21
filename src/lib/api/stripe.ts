import stripe from 'stripe'

import {STRIPE_API_KEY} from 'src/config'
import {IAddress} from 'src/member/member.type'

const client = new stripe(STRIPE_API_KEY, {apiVersion: '2020-08-27'})

interface IChargeArgs {
  amount: number
  source: string
  orderId: string
  address: IAddress
  customerName: string
}

export const Stripe = {
  charge: async ({
    amount,
    source,
    orderId,
    address,
    customerName,
  }: IChargeArgs) => {
    const {addressLine1, city, country, postalCode} = address

    const res = await client.charges.create({
      amount: amount * 100,
      source,
      currency: 'inr',
      description: `Payment for order #${orderId}`,
      shipping: {
        name: customerName,
        address: {
          line1: addressLine1,
          city,
          postal_code: String(postalCode),
        },
      },
    })

    return res
  },
}
