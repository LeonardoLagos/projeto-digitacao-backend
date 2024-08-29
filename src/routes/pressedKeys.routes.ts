import { Router } from "express";
import { PressedKeysController } from "src/controllers/pressedKeysController";

const pressedKeysController = new PressedKeysController();

const pressedKeysRouter = Router();

pressedKeysRouter.post("/", pressedKeysController.register);
pressedKeysRouter.get(
  "/getKeysPercentage",
  pressedKeysController.getKeysPercentage
);

export default pressedKeysRouter;
