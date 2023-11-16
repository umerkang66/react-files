import { ICustomError } from '@/types';

abstract class CustomError extends Error {
  public abstract statusCode: number;

  public abstract serializeErrors(): ICustomError[];

  constructor(message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export { CustomError };
