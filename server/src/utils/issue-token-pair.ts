import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { v4 as createRandomId } from 'uuid';

import { KEYS } from '../configs/keys';
import { RefreshTokenService } from '../services/refresh-token';

type TokenPair = {
  token: string;
  refreshToken: string;
}

export const issueTokenPair = async (userId: mongoose.Types.ObjectId, email: string): Promise<TokenPair> => {
  const refreshToken = createRandomId();

  await RefreshTokenService.add(userId, refreshToken);

  const token = jwt.sign({ userId, email }, KEYS.JWT_SECRET, { expiresIn: '1h' });

  return {
    token,
    refreshToken
  }
};
