import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { BadRequestError } from '../../../errors/bad-request-error';
import { RequestValidationError } from '../../../errors/request-validation-error';
import { Password } from '../../../services/password';
import { UserService } from '../../../services/user';
import { issueTokenPair } from '../../../utils/issue-token-pair';

export const authController = {
  postLogin: async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Look for user in DB by email ,
    // if !user || !password.compare(password, user.password) - return error - user doesn't exist (403)
    // if user exists - create tokenPair(user._id)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const user = await UserService.find({ email: req.body.email });

    if (!user) {
      throw new BadRequestError('User with such email does not exist.');
    }

    const isPasswordsMatch = await Password.compare(user.password, req.body.password);

    if (!isPasswordsMatch) {
      throw new BadRequestError('Wrong password.');
    }

    const { token, refreshToken } = await issueTokenPair(user._id, user.email);
    console.log('TOKENS: ', token, refreshToken)

    // token expiresIn, accessToken, refreshToken
    return res.status(200).json({ message: 'Login ok', accessToken: 'newtoken', refreshToken: 'newrefreshtoken' });
  },
  postLogout: (req: Request, res: Response) => {
  },
  postRefresh: (req: Request, res: Response) => {
  }
}; 
