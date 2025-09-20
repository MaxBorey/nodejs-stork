import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createTaskSchema } from '../validation/tasks.js';
import { getTaskController, postTaskController, setCompletedController } from '../controllers/tasks.js';
import { validateBody } from '../middlewares/validateBody.js';



const tasksRouter = Router();
tasksRouter.use(authenticate);

tasksRouter.post(
  '/tasks',
  validateBody(createTaskSchema),
  postTaskController
);

tasksRouter.get(
  '/tasks',
  getTaskController
);

tasksRouter.patch(
'/tasks/:taskId/completed',
setCompletedController);

export default tasksRouter;
