import { TokenError } from '../errors/token-error';
import mongoose from 'mongoose';

import { RefreshToken } from '../modules/auth/models/refresh-token';

export const RefreshTokenService = {
  find: async (token: string) => {
    try {
      return RefreshToken.findOne({ token });
    } catch (err) {
      throw new TokenError(403, 'Finding refresh token record error.');
    }
  },

  remove: async (userId: mongoose.Types.ObjectId) => {
    try {
      await RefreshToken.deleteOne({ userId });
    } catch (err) {
      throw new TokenError(403, 'Removing refresh token record error.');
    }
  },

  add: async (userId: mongoose.Types.ObjectId, token: string) => {
    try {
      const newRefreshToken = new RefreshToken({ userId, token });
      await newRefreshToken.save();
    } catch (err) {
      throw new TokenError(403, 'Add refresh token record error.');
    }
  }
};
