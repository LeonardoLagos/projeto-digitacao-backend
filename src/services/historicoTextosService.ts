import { Repository } from "typeorm";
import { dataSource as db } from "../database/datasources/dataSource";
import { HistoricoTextos } from "../database/entities/historicoTextos";

interface contagemErros {
    numero_erros: number,
    caracter: string
}

export class HistoricoTextosService {
    historicoTextosRepository: Repository<HistoricoTextos>;

    constructor(historicoTextosRepository = db.getRepository(HistoricoTextos)) {
        this.historicoTextosRepository = historicoTextosRepository;
    }

    async cadastraHistoricoUsuarios(
        id_usuario: string,
        texto: string,
        numero_acertos: number,
        numero_erros: number,
        numero_correcoes: number,
        tempo_total: number,
        palavras_por_minuto: number) {
        const itemDb = await this.historicoTextosRepository.save({
            id_usuario,
            texto,
            status: 'ativo',
            numero_acertos,
            numero_erros,
            numero_correcoes,
            tempo_total,
            palavras_por_minuto
        });

        if (itemDb instanceof Error) {
            return new Error("Erro ao cadastrar historicoUsuarios");
        }
        return itemDb;
    }

    async buscaHistoricoPorUsuario(id_usuario: string) {
        const itemDb = await this.historicoTextosRepository.find({
            where: { id_usuario: id_usuario, status: "ativo" },
            select: ["texto", "numero_acertos", "numero_erros", "numero_correcoes", "tempo_total", "palavras_por_minuto", "data"]
        });

        if (itemDb instanceof Error) {
            return new Error("Histórico vazio");
        }
        return itemDb;
    }
}