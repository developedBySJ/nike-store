import {Request} from 'express'
import {Injectable} from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy} from 'passport-jwt'

import {JWT} from 'src/config'
import {JwtPayload} from 'src/auth/types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.__auth,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT.secret,
    })
  }

  async validate(payload: any): Promise<JwtPayload> {
    return {
      id: payload.id,
      email: payload.email,
      isAdmin: payload.isAdmin,
    }
  }
}
