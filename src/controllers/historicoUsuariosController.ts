import { HistoricoUsuariosService } from "../services/historicoUsuariosService";
import { Request, Response } from 'express';

export class HistoricoUsuariosController {
    historicoUsuariosService: HistoricoUsuariosService;

    constructor(historicoUsuariosService = new HistoricoUsuariosService()) {
        this.historicoUsuariosService = historicoUsuariosService;
    }

    cadastraHistoricoUsuarios = async (request: Request, response: Response) => {
        try {
            const { id_usuario, texto, quantidade_acertos, quantidade_erros, tempo_total } = request.body;

            if (!id_usuario || !texto) {
                response.status(400).json({ message: 'Dados inválidos' });
            }

            const result = await this.historicoUsuariosService.cadastraHistoricoUsuarios(id_usuario, texto, quantidade_acertos, quantidade_erros, tempo_total);

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
            console.log(id_usuario);

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

}