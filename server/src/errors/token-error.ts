import { CommonResponseError } from '../interfaces/common-response-error';
import { CustomError } from './custom-error';

export class TokenError extends CustomError {

  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, TokenError.prototype);
  }

  public serializeErrors(): CommonResponseError[] {
    return [{ message: this.message }];
  }
}
