import { Router } from "express";
import { TextsController } from "../controllers/textsController";

const textsController = new TextsController();

const textsRouter = Router();

textsRouter.get("/", textsController.get);

export default textsRouter;
