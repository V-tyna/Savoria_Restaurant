import mongoose from 'mongoose';

import { ONE_HOUR_IN_MILLISECONDS } from '@rootSrc/configs/variables';
import { RefreshToken } from '@rootSrc/modules/auth/models/refresh-token';

export const RefreshTokenService = {
  find: async (token: string) => {
    return RefreshToken.findOne({ token });
  },

  remove: async (token: string) => {
    await RefreshToken.deleteOne({ token });
  },

  add: async (userId: mongoose.Types.ObjectId, token: string) => {
    const expiresIn = new Date(Date.now() + ONE_HOUR_IN_MILLISECONDS);

    const newRefreshToken = new RefreshToken({ userId, token, expiresIn });
    await newRefreshToken.save();
  }
};
