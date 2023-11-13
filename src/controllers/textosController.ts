import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { TextosService } from '../services/textosService';

dotenv.config()

export class TextosController {
    textosService: TextosService
    constructor(
        textosService = new TextosService()
    ) {
        this.textosService = textosService;
    }

    retornaTextos = async (request: Request, response: Response): Promise<Response> => {
        try {
            const quantidade = request.query.quantidade ? parseInt(request.query.quantidade as string) : 10;

            if (Number.isNaN(quantidade)) {
                return response.status(400).json({ message: 'Quantidade inválida' });
            }
            const result = await this.textosService.getTextos(quantidade);

            if (result instanceof Error) {
                return response.status(400).json({ message: result.message });
            }
            return response.json(result);
        } catch (err) {
            return response.status(400).json({ message: 'Erro na conversão: "Quantidade"' });
        }
    }
}