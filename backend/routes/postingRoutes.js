import { Router } from 'express';
import handler from '../util/errorHandler.js';
import verify from '../middlewares/middleware.js';
import { create, update,sendToPC, closePosting, verifyPosting, rejectPosting, apply, show, viewApplicants,shortlistApp, selectApp } from '../controllers/postingController.js';

const postingRouter = Router();

postingRouter.post('/',verify,handler(create));
postingRouter.put('/:id',verify,handler(update));
postingRouter.post('/:id/submit',verify,handler(sendToPC));
postingRouter.post('/:id/close',verify,handler(closePosting));

postingRouter.post('/:id/verify',verify,handler(verifyPosting));
postingRouter.post('/:id/reject',verify,handler(rejectPosting));

postingRouter.post('/:id/apply',verify,handler(apply));
postingRouter.get('/:id/applicants',verify,handler(viewApplicants));
postingRouter.post('/:id/:applicationId/shortlist',verify,handler(shortlistApp));
postingRouter.post('/:id/:applicationId/select',verify,handler(selectApp));
postingRouter.get('/',verify,handler(show));

export default postingRouter;