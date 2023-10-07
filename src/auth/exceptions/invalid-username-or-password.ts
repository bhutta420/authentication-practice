import { HttpException , HttpStatus } from '@nestjs/common';

export class InvalidUsernameOrPasswordException extends HttpException {
  constructor() {
    super('Invalid username or password', HttpStatus.FORBIDDEN);
  }
}