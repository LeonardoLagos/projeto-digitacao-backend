import { HistoricoTeclasDigitadasService } from "src/services/historioTeclasDigitadasService";
import { Request, Response } from 'express';

export class HistoricoTeclasDigitadasController {
    historicoTeclasDigitadasService: HistoricoTeclasDigitadasService;

    constructor(historicoTeclasDigitadasService = new HistoricoTeclasDigitadasService()) {
        this.historicoTeclasDigitadasService = historicoTeclasDigitadasService;
    }

    cadastraHistoricoTeclasDigitadas = async (request: Request, response: Response) => {
        try {
            const { lista_teclas } = request.body;
            for (let i = 0; i < lista_teclas.length; i++) {
                const { id_usuario, caractere_correto, caractere_digitado } = lista_teclas[i];
                if (!id_usuario || !caractere_correto || !caractere_digitado) {
                    response.status(400).json({ message: 'Dados inválidos' });
                }
                const result = await this.historicoTeclasDigitadasService.cadastraHistoricoTeclasDigitadas(id_usuario, caractere_correto, caractere_digitado);
                if (result instanceof Error) {
                    return response.status(400).json({ message: result.message });
                }
            }

            return response.status(200).json({ message: 'HistoricoTeclasDigitadas cadastrado com sucesso' });
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }
}