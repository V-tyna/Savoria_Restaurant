import { DEV_KEYS } from './dev.keys';

export const KEYS = {
  MONGO_URL: process.env.MONGO_URL || DEV_KEYS.MONGO_URL,
};
