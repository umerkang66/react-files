import { type ValidationError } from 'zod-validation-error';
import { CustomError } from './custom-error';
import { ICustomError } from '@/types';

class RequestZodValidationError extends CustomError {
  public statusCode: number = 400;

  constructor(private error: ValidationError) {
    // for logging purposes
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestZodValidationError.prototype);
  }

  public serializeErrors(): ICustomError[] {
    return this.error.details.map(({ message, path }) => {
      // these errors are coming from express-request validation library
      // technically, we will pass these errors in constructor
      return { message, field: path.join(', ') };
    });
  }
}

export { RequestZodValidationError };
