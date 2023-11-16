import { CustomError } from './custom-error';
import type { ICustomError } from '@/types';

class BadRequestError extends CustomError {
  public statusCode: number = 400;

  constructor(message?: string) {
    // for logging purposes
    super(message || 'Bad Request');
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  public serializeErrors(): ICustomError[] {
    return [{ message: this.message }];
  }
}

export { BadRequestError };
