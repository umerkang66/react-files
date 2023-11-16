import { ICustomError } from '@/types';
import { CustomError } from './custom-error';

class DbConnectionError extends CustomError {
  public statusCode: number = 500;

  constructor(message: string) {
    // for logging purposes
    super(message);
    Object.setPrototypeOf(this, DbConnectionError.prototype);
  }

  public serializeErrors(): ICustomError[] {
    const commonError = '✨✨✨ Db Connection Failed';
    return [{ message: commonError + ' ' + this.message || commonError }];
  }
}

export { DbConnectionError };
