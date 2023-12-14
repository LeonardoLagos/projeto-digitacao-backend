import { HistoricoUsuariosService } from "../services/historicoTextosService";
import { Request, Response } from 'express';

export class HistoricoUsuariosController {
    historicoUsuariosService: HistoricoUsuariosService;

    constructor(historicoUsuariosService = new HistoricoUsuariosService()) {
        this.historicoUsuariosService = historicoUsuariosService;
    }

    cadastraHistoricoUsuarios = async (request: Request, response: Response) => {
        try {
            const { id_usuario, texto, quantidade_acertos, quantidade_erros, tempo_total, palavras_por_minuto } = request.body;

            if (!id_usuario || !texto) {
                response.status(400).json({ message: 'Dados inválidos' });
            }

            const result = await this.historicoUsuariosService.cadastraHistoricoUsuarios(id_usuario, texto, quantidade_acertos, quantidade_erros, tempo_total, palavras_por_minuto);

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
            const id_usuario = request.query.id_usuario.toString();

            if (!id_usuario) {
                response.status(400).json({ message: 'Dados inválidos' });
                return;
            }

            const result = await this.historicoUsuariosService.buscaHistoricoPorUsuario(id_usuario);

            if (result instanceof Error) {
                return response.status(400).json({ message: result.message });
            }
            return response.status(200).json(result);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    buscaQuantidadeErrosPorUsuario = async (request: Request, response: Response) => {
        try{
            const id_usuario = request.query.id_usuario.toString();

            if (!id_usuario) {
                response.status(400).json({ message: 'Dados inválidos' });
                return;
            }

            const result = await this.historicoUsuariosService.buscaQuantidadeErrosPorUsuario(id_usuario);

            if (result instanceof Error) {
                return response.status(400).json({ message: result.message });
            }
            return response.status(200).json(result);

        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    cadastraHistoricoErros = async (request: Request, response: Response) => {
        try {
            const { id_usuario, caractere_correto, caractere_digitado } = request.body;

            if (!id_usuario || !caractere_correto || !caractere_digitado) {
                response.status(400).json({ message: 'Dados inválidos' });
            }

            const result = await this.historicoUsuariosService.cadastraHistoricoErros(id_usuario, caractere_correto, caractere_digitado);

            if (result instanceof Error) {
                return response.status(400).json({ message: result.message });
            }
            return response.status(200).json(result);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    buscaProcentagemErrosPorUsuario = async (request: Request, response: Response) => {
        try{
            const id_usuario = request.query.id_usuario.toString();

            if (!id_usuario) {
                response.status(400).json({ message: 'Dados inválidos' });
                return;
            }

            const result = await this.historicoUsuariosService.buscaPorcentagemErrosPorUsuario(id_usuario);

            if (result instanceof Error) {
                return response.status(400).json({ message: result.message });
            }
            return response.status(200).json(result);

        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }
}