const JWT = {
  secret: process.env.JWT_SECRET,
  exp: 60 * 60 * 24 * 7,
}

if (!JWT.secret) {
  throw new Error('please provide jwt secret')
}

export {JWT}
