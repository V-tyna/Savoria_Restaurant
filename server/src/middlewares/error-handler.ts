import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../errors/custom-error';
import { CommonResponseError } from '../interfaces/common-response-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  const errResponse: CommonResponseError[] = [{ message: 'Something went wrong.' }];

  res.status(400).send({ errors: errResponse });
};
