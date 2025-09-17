import { Router } from 'express';
import authRouter from './auth.js';
import usersRouter from './users.js';
import weeksRouter from './weeks.js';
import diariesRouter from './diaries.js';
import taskRouter from './tasks.js';

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(taskRouter);
router.use('/api', taskRouter);
router.use(diariesRouter);
router.use(weeksRouter);

export default router;
