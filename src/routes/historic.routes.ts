import { Router } from "express";
import { HistoricController } from "src/controllers/historicController";

const coletaPerguntasController = new HistoricController();

const coletaPerguntasRouter = Router();

coletaPerguntasRouter.get(
  "/getByUser",
  coletaPerguntasController.searchByUserId
);
coletaPerguntasRouter.post("/", coletaPerguntasController.register);

export default coletaPerguntasRouter;
