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
        const result = await this.textosService.getTextos();
        if(result instanceof Error) {
            return response.status(400).json({ message: result.message });
        }
        return response.json(result);
    }
}