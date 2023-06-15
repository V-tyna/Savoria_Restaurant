import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { BadRequestError } from '../../../errors/bad-request-error';
import { RequestValidationError } from '../../../errors/request-validation-error';
import { Password } from '../../../services/password';
import { RefreshTokenService } from '../../../services/refresh-token';
import { UserService } from '../../../services/user';
import { issueTokenPair } from '../../../utils/issue-token-pair';

export const authController = {
  postLogin: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const user = await UserService.find({ email });

    if (!user) {
      throw new BadRequestError('User with such email does not exist.');
    }

    const isPasswordsMatch = await Password.compare(user.password, password);

    if (!isPasswordsMatch) {
      throw new BadRequestError('Wrong password.');
    }

    const { token, refreshToken } = await issueTokenPair(user._id, user.email);

    return res.status(200).json({
      message: 'Successful login.',
      accessToken: token,
      refreshToken,
      userId: user._id,
      email
    });
  },
  postLogout: async (req: Request, res: Response) => {
    await RefreshTokenService.remove(req.body.userId);

    return res.status(200).json({ message: 'Successful logout.' });
  },
  postRefresh: async (req: Request, res: Response) => {
    const { refreshToken: tokenToFind, userId, email } = req.body;
    const dbToken = await RefreshTokenService.find(tokenToFind);

    if (!dbToken) {
      return;
    }

    await RefreshTokenService.remove(userId);

    const { token, refreshToken } = await issueTokenPair(userId, email);

    return res.status(200).json({
      message: 'Successful refresh tokens pair.',
      accessToken: token,
      refreshToken,
      userId,
      email
    });
  }
}; 
