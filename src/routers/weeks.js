import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';



const weeksRouter = Router();
weeksRouter.use(authenticate);



export default weeksRouter;
