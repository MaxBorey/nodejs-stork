import { Router } from 'express';
import authRouter from './auth.js';
import usersRouter from './users.js';
import weeksRouter from './weeks.js';
import diariesRouter from './diaries.js';
import tasksRouter from './tasks.js';

const router = Router();

router.use(authRouter);
router.use(weeksRouter);
router.use(usersRouter);
router.use(tasksRouter);
router.use(diariesRouter);



export default router;
