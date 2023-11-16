import { CustomError } from './custom-error';
import type { ICustomError } from '@/types';

class UnAuthorizedError extends CustomError {
  public statusCode: number = 401;

  constructor(message: string = 'You are not authorized to do this task') {
    // for logging purposes
    super(message);
    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
  }

  public serializeErrors(): ICustomError[] {
    return [{ message: this.message }];
  }
}

export { UnAuthorizedError };
