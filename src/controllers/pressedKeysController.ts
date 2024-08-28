import { Request, Response } from "express";
import { PressedKeysService } from "../services/pressedKeysService";

export class PressedKeysController {
  pressedKeysService: PressedKeysService;

  constructor(pressedKeysService = new PressedKeysService()) {
    this.pressedKeysService = pressedKeysService;
  }

  register = async (request: Request, response: Response) => {
    try {
      const { keysList } = request.body;
      for (let i = 0; i < keysList.length; i++) {
        const { userId, correctKey, pressedKey } = keysList[i];
        if (!userId || !correctKey || !pressedKey) {
          response.status(400).json({
            message: "Dados inválidos",
            userId,
            correctKey,
            pressedKey,
          });
        }
        const result = await this.pressedKeysService.register(
          userId,
          correctKey,
          pressedKey
        );
        if (result instanceof Error) {
          return response.status(400).json({ message: result.message });
        }
      }

      return response
        .status(200)
        .json({ message: "teclas cadastradas com sucesso!" });
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  };

  getKeysPercentage = async (request: Request, response: Response) => {
    try {
      if (request.query.id_usuario == undefined) {
        response.status(400).json({ message: "Dados inválidos" });
        return;
      }
      const userId = request.query.id_usuario.toString();

      const result = await this.pressedKeysService.getKeysPercentage(userId);
      if (result instanceof Error) {
        return response.status(400).json({ message: result.message });
      }

      return response.status(200).json(result);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  };
}
