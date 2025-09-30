import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, loginWithGoogleOAuthSchema, registerUserSchema } from '../validation/auth.js';
import { checkSessionController, loginUserController, loginWithGoogleController, logoutUserController, refreshUserSessionController, registerUserController } from '../controllers/auth.js';
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

authRouter.post(
  '/auth/refresh',
  refreshUserSessionController
);


authRouter.get(
  '/get-oauth-url',
  getGoogleOAuthUrlController);

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  loginWithGoogleController,
);

authRouter.get(
  '/auth/session',
  checkSessionController
);

export default authRouter;
