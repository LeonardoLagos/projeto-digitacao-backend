import { Router } from "express";
import { UsersController } from "../controllers/usersController";

const usersController = new UsersController();

const userRouter = Router();

userRouter.post("/login", usersController.login);
userRouter.post("/dataByToken", usersController.getDataByToken);
userRouter.post("/register", usersController.register);

export default userRouter;
