import { Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'


@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {

    return exception

  }

}