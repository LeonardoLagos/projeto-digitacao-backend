import { HistoricoTeclasDigitadas } from "../database/entities/historicoTeclasDigitadas";
import { Repository } from "typeorm";
import { dataSource as db } from "../database/datasources/dataSource";

interface contagemErros {
    caracter: string,
    numero_erros: number,
    numero_acertos: number,
    porcentagem_erros: number,
    porcentagem_acertos: number,
    label: string
}

export class HistoricoTeclasDigitadasService {
    historicoTeclasDigitadasRepository: Repository<HistoricoTeclasDigitadas>;

    constructor(historicoTeclasDigitadasRepository = db.getRepository(HistoricoTeclasDigitadas)) {
        this.historicoTeclasDigitadasRepository = historicoTeclasDigitadasRepository;
    }

    async cadastraHistoricoTeclasDigitadas(id_usuario: string, caractere_correto: string, caractere_digitado: string) {
        const itemDb = await this.historicoTeclasDigitadasRepository.save({ id_usuario, caractere_correto, caractere_digitado });

        if (itemDb instanceof Error) {
            return new Error("Erro ao cadastrar historicoTeclasDigitadas");
        }
        return itemDb;
    }

    async retornaPorcentagemTeclasDigitadas(id_usuario: string) {
        const itemDb = await this.historicoTeclasDigitadasRepository.find({ where: { id_usuario } });

        if (itemDb instanceof Error) {
            return new Error("Erro ao buscar historicoTeclasDigitadas");
        }
        const listaCaracteres = [] as contagemErros[];

        itemDb.forEach((item) => {
            let caracterAtual = listaCaracteres.find((erro) => erro.caracter === item.caractere_correto);
            if (caracterAtual === undefined) {
                listaCaracteres.push({ caracter: item.caractere_correto, numero_erros: 0, numero_acertos: 0, porcentagem_erros: 0, porcentagem_acertos: 0, label: '' });
                caracterAtual = listaCaracteres.find((erro) => erro.caracter === item.caractere_correto);
            }

            if (item.caractere_correto !== item.caractere_digitado) {
                caracterAtual.numero_erros++;
            } else {
                caracterAtual.numero_acertos++;
            }
        });

        listaCaracteres.forEach((item) => {
            const soma = item.numero_erros + item.numero_acertos
            item.porcentagem_erros = (item.numero_erros / soma) * 100;
            item.porcentagem_acertos = (item.numero_acertos / soma) * 100;
            item.label = Number(item.porcentagem_erros).toFixed(2) + '%';
        });
        return listaCaracteres;
    }
}