import { CustomError } from './custom-error';
import type { ICustomError } from '@/types';

class UnAuthenticatedError extends CustomError {
  public statusCode: number = 401;

  constructor(message: string = 'You are not authenticated to do this task') {
    // for logging purposes
    super(message);
    Object.setPrototypeOf(this, UnAuthenticatedError.prototype);
  }

  public serializeErrors(): ICustomError[] {
    return [{ message: this.message }];
  }
}

export { UnAuthenticatedError };
