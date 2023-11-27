import { HistoricoUsuarios } from "../database/entities/historicoUsuarios";
import { Repository } from "typeorm";
import { dataSource as db } from "../database/datasources/dataSource";


export class HistoricoUsuariosService {
    historicoUsuariosRepository: Repository<HistoricoUsuarios>;

    constructor(historicoUsuariosRepository = db.getRepository(HistoricoUsuarios)) {
        this.historicoUsuariosRepository = historicoUsuariosRepository;
    }

    async getHistoricoUsuarios() {
        const itemDb = await this.historicoUsuariosRepository.find();

        if (itemDb instanceof Error) {
            return new Error("Erro ao buscar historicoUsuarios");
        }
        return itemDb;
    }

    async getHistoricoUsuariosPorId(id: number) {
        const itemDb = await this.historicoUsuariosRepository.findOne({ where: { id: id } });

        if (itemDb instanceof Error) {
            return new Error("Erro ao buscar historicoUsuarios");
        }
        return itemDb;
    }

    async cadastraHistoricoUsuarios(id_usuario: string, texto: string, numero_acertos: number, numero_erros: number, tempo_total: number, palavras_por_minuto: number) {
        const itemDb = await this.historicoUsuariosRepository.save({ id_usuario, texto, status: 'ativo', numero_acertos, numero_erros, tempo_total, palavras_por_minuto });

        if (itemDb instanceof Error) {
            return new Error("Erro ao cadastrar historicoUsuarios");
        }
        return itemDb;
    }

    async buscaHistoricoPorUsuario(id_usuario: string) {
        const itemDb = await this.historicoUsuariosRepository.find({ where: { id_usuario: id_usuario, status: "ativo" }, select: ["texto", "numero_acertos", "numero_erros", "tempo_total", "palavras_por_minuto", "data"] });

        if (itemDb instanceof Error) {
            return new Error("Histórico vazio");
        }
        return itemDb;
    }
}