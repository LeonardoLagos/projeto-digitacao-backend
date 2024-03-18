import { Router } from "express";

import { KeysHistoricController } from "./controllers/keysHistoricController";
import { TextosController } from "./controllers/textsController";

const routes = Router();
routes.get("/texts/getAmount", new TextosController().getAmount);

routes.put("/historic/keys", new KeysHistoricController().register);
routes.get(
  "/historic/getPrecision",
  new KeysHistoricController().returnPrecision
);

export default routes;
