import { Router } from 'express';

import { authController } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/admin/login', authController.postLogin);

export default authRouter;
