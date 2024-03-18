import { Request, Response } from "express";
import { KeysHistoricService } from "../services/keysHistoricService";

export class KeysHistoricController {
  keysHistoricService: KeysHistoricService;

  constructor(keysHistoricService = new KeysHistoricService()) {
    this.keysHistoricService = keysHistoricService;
  }

  register = async (request: Request, response: Response) => {
    try {
      const { keysList } = request.body;

      await this.keysHistoricService.register(keysList);

      return response
        .status(200)
        .json({ message: "Histórico cadastrado com sucesso!" });
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  };

  returnPrecision = async (request: Request, response: Response) => {
    try {
      if (request.headers.userId == undefined) {
        response.status(400).json({ message: "Dados inválidos" });
        return;
      }
      const userId = request.headers.userId.toString();

      const result = await this.keysHistoricService.returnPrecision(userId);

      return response.status(200).json(result);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  };
}
