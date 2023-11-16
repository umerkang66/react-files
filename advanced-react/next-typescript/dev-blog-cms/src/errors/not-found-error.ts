import { CustomError } from './custom-error';
import type { ICustomError } from '@/types';

class NotFoundError extends CustomError {
  public statusCode: number = 404;

  constructor(message: string) {
    // for logging purposes
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  public serializeErrors(): ICustomError[] {
    return [{ message: this.message }];
  }
}

export { NotFoundError };
