import dotenv from "dotenv";
import { Request, Response } from "express";
import { TextsService } from "../services/textsService";

dotenv.config();

export class TextsController {
  textsService: TextsService;
  constructor(textsService = new TextsService()) {
    this.textsService = textsService;
  }

  get = async (request: Request, response: Response): Promise<Response> => {
    try {
      const maxCount = request.query.max_count
        ? parseInt(request.query.max_count as string)
        : 10;

      if (Number.isNaN(maxCount)) {
        return response.status(400).json({ message: "Quantidade inválida" });
      }
      const result = await this.textsService.get(maxCount);

      if (result instanceof Error) {
        return response.status(400).json({ message: result.message });
      }
      return response.json(result);
    } catch (err) {
      return response
        .status(400)
        .json({ message: 'Erro na conversão: "max_count"' });
    }
  };
}
