import { HistoricoTextosService } from "../services/historicoTextosService";
import { Request, Response } from 'express';

export class HistoricoTextosController {
    historicoTextosService: HistoricoTextosService;

    constructor(historicoTextosService = new HistoricoTextosService()) {
        this.historicoTextosService = historicoTextosService;
    }

    cadastraHistoricoUsuarios = async (request: Request, response: Response) => {
        try {
            const {
                id_usuario,
                texto,
                numero_acertos,
                numero_erros,
                numero_correcoes,
                tempo_total,
                palavras_por_minuto
            } = request.body;

            console.log(id_usuario,
                numero_acertos,
                numero_erros,
                numero_correcoes,
                tempo_total,
                palavras_por_minuto)

            if (!id_usuario || !texto) {
                console.log(texto)
                response.status(400).json({ message: 'Dados inválidos' });
            }
            
            const result = await this.historicoTextosService.cadastraHistoricoUsuarios(
                id_usuario,
                texto,
                numero_acertos,
                numero_erros,
                numero_correcoes,
                tempo_total,
                palavras_por_minuto);

            if (result instanceof Error) {
                return response.status(400).json({ message: result.message });
            }
            return response.status(200).json(result);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    buscaHistoricoPorUsuario = async (request: Request, response: Response) => {
        try {
            if (request.query.id_usuario == undefined) {
                response.status(400).json({ message: 'Dados inválidos' });
                return;
            }
            const id_usuario = request.query.id_usuario.toString();


            const result = await this.historicoTextosService.buscaHistoricoPorUsuario(id_usuario);

            if (result instanceof Error) {
                return response.status(400).json({ message: result.message });
            }
            return response.status(200).json(result);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }
}