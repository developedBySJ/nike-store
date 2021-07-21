import {forwardRef, Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {PassportModule} from '@nestjs/passport'

import {AuthService} from './auth.service'
import {JwtStrategy} from './jwt.strategy'
import {AuthResolver} from './auth.resolver'
import {CartModule} from 'src/cart/cart.module'
import {MemberModule} from 'src/member/member.module'
import {Cart, CartSchema} from 'src/cart/cart.entity'
import {Member, MemberSchema} from 'src/member/member.entity'
import {FavouriteModule} from 'src/favourite/favourite.module'
import {Favourite, FavouriteSchema} from 'src/favourite/favourite.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{name: Member.name, schema: MemberSchema}]),
    MongooseModule.forFeature([{name: Cart.name, schema: CartSchema}]),
    MongooseModule.forFeature([
      {name: Favourite.name, schema: FavouriteSchema},
    ]),
    forwardRef(() => MemberModule),
    forwardRef(() => CartModule),
    forwardRef(() => FavouriteModule),
    PassportModule,
  ],

  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
