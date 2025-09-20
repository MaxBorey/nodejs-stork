import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createDiaryEntryController, deleteDiaryEntryController, getDiaryEntriesController, getEmotionsController, updateDiaryEntryController } from '../controllers/diaries.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createDiaryEntrySchema, updateDiaryEntrySchema } from '../validation/diaries.js';


const diariesRouter = Router();
diariesRouter.use(authenticate);

diariesRouter.post('/diaries', validateBody(createDiaryEntrySchema), createDiaryEntryController);

diariesRouter.get('/diaries', getDiaryEntriesController);

diariesRouter.patch('/diaries/:entryId', validateBody(updateDiaryEntrySchema),updateDiaryEntryController);

diariesRouter.delete('/diaries/:entryId',  deleteDiaryEntryController);

diariesRouter.get('/emotions', getEmotionsController);

export default diariesRouter;
