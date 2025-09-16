import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';



const usersRouter = Router();
usersRouter.use(authenticate);



export default usersRouter;
