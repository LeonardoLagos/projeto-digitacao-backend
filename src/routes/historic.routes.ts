import { Router } from "express";
import { HistoricController } from "../controllers/historicController";

const historicController = new HistoricController();

const historicRouter = Router();

historicRouter.post("/", historicController.register);
historicRouter.get("/getByUserId", historicController.searchByUserId);

export default historicRouter;
