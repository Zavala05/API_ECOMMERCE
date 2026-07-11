import express from "express";
import { registerUserController, loginUserController, getMeController } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../middlewares/auth.middleware.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegister, registerUserController);

authRouter.post('/login', validateLogin, loginUserController )

authRouter.get('/me', authenticate, authorize("ADMIN","MODERATOR"),getMeController)

export default authRouter;