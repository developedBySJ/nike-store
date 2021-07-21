export interface UserPayload {
  id: string
  email: string
  isAdmin: boolean
  iat: number
  exp: string
}
export interface JwtPayload {
  id: string
  email: string
  isAdmin: boolean
}
