import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createTaskController,
  getTasksController,
  updateTaskStatusController,
} from '../controllers/taskController.js';
import {
  createTaskSchema,
  updateTaskStatusSchema,
} from '../validation/task.js';

const taskRouter = Router();

taskRouter.use(authenticate);

taskRouter.post('/tasks', validateBody(createTaskSchema), createTaskController);

taskRouter.get('/tasks', getTasksController);

taskRouter.patch(
  '/tasks/:taskId/status',
  validateBody(updateTaskStatusSchema),
  updateTaskStatusController,
);

export default taskRouter;
