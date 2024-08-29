import { Router } from "express";
import { HistoricController } from "src/controllers/historicController";

const coletaPerguntasController = new HistoricController();

const coletaPerguntasRouter = Router();

coletaPerguntasRouter.post("/", coletaPerguntasController.register);
coletaPerguntasRouter.get(
  "/getByUserId",
  coletaPerguntasController.searchByUserId
);

export default coletaPerguntasRouter;
