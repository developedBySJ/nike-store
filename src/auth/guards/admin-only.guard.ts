import {GqlExecutionContext} from '@nestjs/graphql'
import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common'

@Injectable()
export class AdminOnly implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const {req} = ctx.getContext()

    return req.user?.isAdmin
  }
}
