import { HistoricoTeclasDigitadas } from "../database/entities/historicoTeclasDigitadas";
import { Repository } from "typeorm";
import { dataSource as db } from "../database/datasources/dataSource";


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
}