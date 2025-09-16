import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { loginUserController, logoutUserController, registerUserController } from '../controllers/auth.js';


const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserSchema),
  registerUserController
);

authRouter.post(
  '/auth/login',
  validateBody(loginUserSchema),
  loginUserController,
);

authRouter.post(
  '/auth/logout',
  logoutUserController
);



export default authRouter;
