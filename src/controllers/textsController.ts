import dotenv from "dotenv";
import { Request, Response } from "express";
import { TextsService } from "../services/textsService";

dotenv.config();

export class TextosController {
  textosService: TextsService;
  constructor(textosService = new TextsService()) {
    this.textosService = textosService;
  }

  getAmount = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const amount = request.headers
        ? (request.headers.amount as unknown as number)
        : 10;

      if (Number.isNaN(amount)) {
        return response.status(400).json({ message: "Quantidade inválida" });
      }

      const result = await this.textosService.getAmount(amount);

      return response.status(200).json(result);
    } catch (err) {
      return response
        .status(400)
        .json({ message: 'Erro na conversão: "Quantidade"' });
    }
  };
}
