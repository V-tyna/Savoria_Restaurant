import { Request, Response } from 'express';

export const loginController = {
  postLogin: (req: Request, res: Response) => {
    console.log('Login to post User data to verify login', req.body)
    return res.status(200).json({ message: 'Login ok' })
  }
};
