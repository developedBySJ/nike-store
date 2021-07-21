export const CookieExpires = new Date(
  new Date().getTime() + 24 * 3600 * 7 * 1000,
)

export const isProduction = process.env.NODE_ENV == 'production'

export const COOKIES = {
  secret: process.env.COOKIE_SECRET,
  options: {expires: CookieExpires, secure: isProduction, signed: true},
}
