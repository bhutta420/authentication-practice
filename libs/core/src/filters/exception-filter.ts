import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost
  ) {

  }

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const response = exception.getResponse?.() ?? 'Internal error';
    this.logger.log(response)
    const description = exception?.options?.description ?? ''
    const cause = exception?.options?.cause ?? ''
    let message = typeof response == 'string' ? response : response?.message ?? ''
    if(message=='ThrottlerException: Too Many Requests'){
      message='Too many attempts'
    }
    const errors = response instanceof String ? response : response?.errors ?? {}
    const detail = {
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      description: description,
      cause: cause,
    }
    const responseBody = {
      statusCode: httpStatus,
      message: message, 
      errors: errors,
      ...true ? detail : {},
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}