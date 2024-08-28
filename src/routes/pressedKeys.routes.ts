import { Router } from "express";
import { PressedKeysController } from "src/controllers/pressedKeysController";

const pressedKeysController = new PressedKeysController();

const pressedKeysRouter = Router();

pressedKeysRouter.get(
  "/getPercentage",
  pressedKeysController.getKeysPercentage
);
pressedKeysRouter.post("/", pressedKeysController.register);

export default pressedKeysRouter;
