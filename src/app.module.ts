import {join} from 'path'
import {JwtModule} from '@nestjs/jwt'
import {ConfigModule} from '@nestjs/config'
import {Global, Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'
import {MongooseModule} from '@nestjs/mongoose'
import {ServeStaticModule} from '@nestjs/serve-static'
import {GraphQLError, GraphQLFormattedError} from 'graphql'

import {DB, JWT} from 'src/config'
import {CartModule} from 'src/cart/cart.module'
import {AuthModule} from 'src/auth/auth.module'
import {OrderModule} from 'src/order/order.module'
import {ReviewModule} from 'src/review/review.module'
import {MemberModule} from 'src/member/member.module'
import {ProductModule} from 'src/product/product.module'
import {FavouriteModule} from 'src/favourite/favourite.module'

@Global()
@Module({
  imports: [
    {
      ...JwtModule.register({
        secret: JWT.secret,
        signOptions: {expiresIn: JWT.exp},
      }),
      global: true,
    },
  ],

  exports: [JwtModule],
})
export class CoreModule {}
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    CoreModule,
    MongooseModule.forRoot(DB.uri, DB.options),
    {
      ...JwtModule.register({
        secret: JWT.secret,
        signOptions: {expiresIn: JWT.exp},
      }),
      global: true,
    },
    AuthModule,
    CartModule,
    MemberModule,
    FavouriteModule,
    ReviewModule,
    ProductModule,
    OrderModule,
    GraphQLModule.forRoot({
      cors: {
        origin: 'https://nike-store-dsj.herokuapp.com',
      },
      context: ({req, res}) => ({req, res}),
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      uploads: false,

      formatError: (error: GraphQLError) => {
        console.log(error)

        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            error?.extensions?.exception?.response?.message || error.message,
        }

        return graphQLFormattedError
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
      exclude: ['/graphQl'],
      serveStaticOptions: {
        extensions: [],
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
