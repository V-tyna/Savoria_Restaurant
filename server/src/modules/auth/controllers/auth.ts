import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';

export const authController = {
  postLogin: async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Look for user in DB by email ,
    // if !user || !password.compare(password, user.password) - return error - user doesn't exist (403)
    // if user exists - create tokenPair(user._id)
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log('USER: ', user);
      if (!user) {
        const error = new Error();
        //@ts-ignore
        error.status = 403;
        throw error;
      }

      console.log('Login to post User data to verify login', req.body)
      return res.status(200).json({ message: 'Login ok', accessToken: 'fjd', refreshToken: 'hvch' });
    } catch (e) {
      next(e);
    }
  },
  postLogout: (req: Request, res: Response) => {
  },
  postRefresh: (req: Request, res: Response) => {
  }
}; 
