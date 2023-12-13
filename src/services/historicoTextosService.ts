import { HistoricoTextos } from "../database/entities/historicoTextos";
import { Repository } from "typeorm";
import { dataSource as db } from "../database/datasources/dataSource";

interface contagemErros {
    numero_erros: number,
    caracter: string
}

export class HistoricoUsuariosService {
    historicoUsuariosRepository: Repository<HistoricoTextos>;

    constructor(historicoUsuariosRepository = db.getRepository(HistoricoTextos)) {
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

    async buscaQuantidadeErrosPorUsuario(id_usuario: string) {
        const itemDb = await this.historicoUsuariosRepository.find({ where: { id_usuario: id_usuario, status: "ativo" }, select: ["texto"] });
        if (itemDb instanceof Error) {
            return new Error("Histórico vazio");
        }
        const listaCaracteres = [] as contagemErros[];

        itemDb.forEach((item) => {
            JSON.parse(item.texto).forEach((item2) => {
                if (item2.className.includes("erro")) {
                    const erroAtual = listaCaracteres.find((erro) => erro.caracter === item2.children);
                    if (erroAtual !== undefined) {
                        erroAtual.numero_erros++;
                    }
                    else {
                        listaCaracteres.push({ numero_erros: 1, caracter: item2.children });
                    }

                } else {
                    item2.acerto = false;
                }
            });
        });

        return listaCaracteres;
    }

    async cadastraHistoricoErros(id_usuario: string, caractere_correto: string, caractere_digitado: string) {
        const itemDb = await this.historicoUsuariosRepository.save({ id_usuario, caractere_correto, caractere_digitado });

        if (itemDb instanceof Error) {
            return new Error("Erro ao cadastrar historicoUsuarios");
        }
        return itemDb;
    }
}