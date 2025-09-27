import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, loginWithGoogleOAuthSchema, registerUserSchema } from '../validation/auth.js';
import { loginUserController, loginWithGoogleController, logoutUserController, registerUserController } from '../controllers/auth.js';
import { getGoogleOAuthUrlController } from '../controllers/auth.js';


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

authRouter.get(
  '/get-oauth-url',
  getGoogleOAuthUrlController);

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  loginWithGoogleController,
);

export default authRouter;
