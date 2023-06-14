import { Router } from 'express';

import { loginValidators } from '../../../utils/route-validators';
import { authController } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/login', loginValidators, authController.postLogin);

export default authRouter;
