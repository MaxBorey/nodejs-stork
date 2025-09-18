import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getUsersMeController,
  updateUsersMeController,
} from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUsersMeSchema } from '../validation/users.js';
import { isValidId } from '../middlewares/isValidId.js';

const usersRouter = Router();
usersRouter.use(authenticate);

usersRouter.get('/users/me', getUsersMeController);

usersRouter.patch(
  '/users/me/:userId',
  isValidId,
  validateBody(updateUsersMeSchema),
  updateUsersMeController,
);

export default usersRouter;
