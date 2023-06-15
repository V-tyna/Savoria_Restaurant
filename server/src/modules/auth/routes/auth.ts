import { isAuth } from '../../../middlewares/isAuth';
import { Router } from 'express';

import { loginValidators } from '../../../utils/route-validators';
import { authController } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/login', loginValidators, authController.postLogin);
authRouter.post('/refresh', isAuth, authController.postRefresh);
authRouter.post('/logout', isAuth, authController.postLogout);

export default authRouter;
