import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getBabyDetails, getMomDetails, getPrivateWeekInfo, getPublicWeekInfo } from '../controllers/weeks.js';

const weeksRouter = Router();

weeksRouter.get('/weeks/public', getPublicWeekInfo);

weeksRouter.get('/weeks/info', authenticate, getPrivateWeekInfo);
weeksRouter.get('/weeks/:week/baby', authenticate, getBabyDetails);
weeksRouter.get('/weeks/:week/mom', authenticate, getMomDetails);

export default weeksRouter;
