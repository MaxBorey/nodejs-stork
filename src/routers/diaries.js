import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';



const diariesRouter = Router();
diariesRouter.use(authenticate);



export default diariesRouter;
