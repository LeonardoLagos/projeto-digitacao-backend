import { Request, Response } from "express";
import { HistoricService } from "../services/historicService";

export class HistoricController {
  historicService: HistoricService;

  constructor(historicService = new HistoricService()) {
    this.historicService = historicService;
  }

  register = async (request: Request, response: Response) => {
    try {
      const {
        userId,
        text,
        hitCount,
        missCount,
        correctionCount,
        duration,
        wpm,
      } = request.body;

      console.log(
        userId,
        text,
        hitCount,
        missCount,
        correctionCount,
        duration,
        wpm
      );

      if (!userId || !text) {
        console.log(text);
        response.status(400).json({ message: "Dados inválidos" });
      }

      const result = await this.historicService.register(
        userId,
        text,
        hitCount,
        missCount,
        correctionCount,
        duration,
        wpm
      );

      if (result instanceof Error) {
        return response.status(400).json({ message: result.message });
      }
      return response.status(200).json(result);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  };

  searchByUserId = async (request: Request, response: Response) => {
    try {
      if (request.query.id_usuario == undefined) {
        response.status(400).json({ message: "Dados inválidos" });
        return;
      }
      const userId = request.query.id_usuario.toString();

      const result = await this.historicService.searchByUserId(userId);

      if (result instanceof Error) {
        return response.status(400).json({ message: result.message });
      }
      return response.status(200).json(result);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  };
}
