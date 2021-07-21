import {forwardRef, Inject} from '@nestjs/common'
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql'

import {Viewer} from './auth.model'
import {AuthService} from './auth.service'
import {LoginDto, SignUpDto} from './auth.dto'
import {LoginInput, SignUpInput} from './auth.input'

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  @Mutation((of) => Viewer)
  async signUp(
    @Args({name: 'SignUpInput', type: () => SignUpInput})
    signUpDetails: SignUpDto,
    @Context() ctx: GraphQLExecutionContext,
  ) {
    const {
      token,
      user: {_id, firstName, lastName, isAdmin, email, avatar},
    } = await this.authService.signUp(signUpDetails)

    // @ts-ignore
    ctx.res.cookie('__auth', token)

    return {
      id: _id,
      firstName,
      lastName,
      isAdmin,
      avatar,
      email,
      didRequest: true,
    }
  }

  @Mutation((of) => Viewer)
  async login(
    @Args({name: 'LoginInput', type: () => LoginInput}) loginDetails: LoginDto,
    @Context() ctx: GraphQLExecutionContext,
  ) {
    const {
      user: {_id, firstName, lastName, isAdmin, email, avatar},
      token,
    } = await this.authService.login(loginDetails)

    // @ts-ignore
    ctx.res.cookie('__auth', token)

    return {
      id: _id,
      firstName,
      lastName,
      isAdmin,
      avatar,
      email,
      didRequest: true,
    }
  }

  @Mutation((of) => Viewer)
  logOut(@Context() ctx: GraphQLExecutionContext) {
    // @ts-ignore
    ctx.res.cookie('__auth', '', {expires: new Date()})

    return {didRequest: true}
  }
}
