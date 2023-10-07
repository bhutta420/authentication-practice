
import { ValidationPipe } from '@nestjs/common/pipes';
import { ValidationErrorException } from '../exceptions';
import * as _ from 'lodash'
export const customeValidationPipe =  new ValidationPipe({
  stopAtFirstError: false,
  exceptionFactory(errors) {
    let new_errors = _.keyBy(errors,'property')
    throw new ValidationErrorException(new_errors)
  },
})