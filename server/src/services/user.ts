import { User } from '../modules/auth/models/user';

export const UserService = {
  find: async (options: { [key: string]: string }) => {
    return await User.findOne(options);
  }
};
