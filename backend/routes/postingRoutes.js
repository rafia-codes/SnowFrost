import { Router } from 'express';
import handler from '../util/errorHandler.js';
import verify from '../middlewares/middleware.js';
import { create, update,sendToPC, closePosting, verifyPosting, rejectPosting, apply, show } from '../controllers/postingController.js';

const postingRouter = Router();

postingRouter.post('/',verify,handler(create));
postingRouter.put('/:id',verify,handler(update));
postingRouter.post('/:id/submit',verify,handler(sendToPC));
postingRouter.post('/:id/close',verify,handler(closePosting));

postingRouter.post('/:id/verify',verify,handler(verifyPosting));
postingRouter.post('/:id/reject',verify,handler(rejectPosting));

postingRouter.post('/:id/apply',verify,handler(apply));
postingRouter.get('/',verify,handler(show));//from fe expect ?status=VERIFIED to process query to show up only verified postings to student

export default postingRouter;