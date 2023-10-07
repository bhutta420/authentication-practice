import { HttpException , HttpStatus } from '@nestjs/common';

export class ValidationErrorException extends HttpException {
  constructor(errors) {
    super({
      message: 'The given data is invalid',
      errors,
    }, HttpStatus.FORBIDDEN);
  }
}