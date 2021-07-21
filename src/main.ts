require('dotenv').config()
import * as helmet from 'helmet'
import {NestFactory} from '@nestjs/core'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import {ValidationPipe} from '@nestjs/common'
import {graphqlUploadExpress} from 'graphql-upload'

import {COOKIES} from 'src/config'
import {AppModule} from 'src/app.module'
import {AllExceptionsFilter} from 'src/lib/globalErrorHandler'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(helmet({contentSecurityPolicy: false}))
  app.use(compression())
  app.use(cookieParser(COOKIES.secret))
  app.use(graphqlUploadExpress({maxFileSize: 1000000000, maxFiles: 10}))

  app.useGlobalPipes(
    new ValidationPipe({whitelist: true, skipMissingProperties: true}),
  )
  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(process.env.PORT || 9000)
}
bootstrap()
