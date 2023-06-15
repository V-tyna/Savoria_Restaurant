import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { KEYS } from '../configs/keys';
import { TokenError } from '../errors/token-error';

export const isAuth = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new TokenError(403, 'Unauthorized.');
  }

  try {
    jwt.verify(token, KEYS.JWT_SECRET, {}, (err, _decoded) => {
      if (err instanceof TokenExpiredError) {
        throw new TokenError(403, 'Forbidden. Access denied. Token expired.');
      }
      if (err) {
        throw new TokenError(403, 'Forbidden. Access denied. Token is not valid.');
      }
    });

    next();
  } catch (err) {
    if (err instanceof TokenError) {
      throw new TokenError(403, err.message);
    }
    throw new TokenError(403, 'Token verifying error.');
  }

}
