import { Router } from "express";
import handler from '../util/errorHandler';
import { login, logout, register } from "../controllers/authController";

const router = Router();

router.post('/register',handler(register));
router.post('/login',handler(login));
router.post('/logout',handler(logout));

export default router;