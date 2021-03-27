const STRIPE_API_KEY = process.env.STRIPE_KEY

if (!STRIPE_API_KEY) { throw new Error("please provide stripe key") }

export { STRIPE_API_KEY }