import { Router } from "express";
import { UsersController } from "src/controllers/usersController";

const usersController = new UsersController();

const textsRouter = Router();

textsRouter.post("/login", usersController.login);
textsRouter.post("/dataByToken", usersController.getDataByToken);
textsRouter.post("/register", usersController.register);

export default textsRouter;
