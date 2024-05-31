import { Router } from "express";
import * as AuthController from "../controllers/AuthController.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";

const router = new Router();

router.post("/sign-in", AuthController.SignIn);
router.post("/sign-up", AuthController.SignUp);
router.get("/verify-token", jwtAuth, AuthController.VerifyToken);

export default router