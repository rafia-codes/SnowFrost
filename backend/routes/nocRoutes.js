import { Router } from "express";
import verify from '../middlewares/middleware.js';
import handler from "../util/errorHandler.js";
import { applyNoc, show, approveNoc, rejectNoc } from "../controllers/nocController.js";

const router = Router();

router.post('/',verify,handler(applyNoc));
router.get('/',verify,handler(show));
router.post('/:id/approve',verify,handler(approveNoc));
router.post('/:id/reject',verify,handler(rejectNoc));

export default router;