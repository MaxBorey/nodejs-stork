import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';



const tasksRouter = Router();
tasksRouter.use(authenticate);



export default tasksRouter;
