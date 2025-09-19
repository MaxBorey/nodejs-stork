import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createDiaryNoteController } from '../controllers/diaries.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createDiaryNoteSchema } from '../validation/diaries.js';



const diariesRouter = Router();
diariesRouter.use(authenticate);

diariesRouter.post('/diaries', validateBody(createDiaryNoteSchema), ctrlWrapper(createDiaryNoteController));



export default diariesRouter;
