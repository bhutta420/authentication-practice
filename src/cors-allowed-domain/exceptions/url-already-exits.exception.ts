import { HttpException , HttpStatus } from '@nestjs/common';

export class UrlAlreadyExitsException extends HttpException {
  constructor() {
    super('Url already exits', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}