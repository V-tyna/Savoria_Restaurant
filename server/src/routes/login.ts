import { Router } from 'express';

import { loginController } from '../controllers/login';

const loginRouter = Router();

loginRouter.post('/admin/login', loginController.postLogin);

export default loginRouter;
