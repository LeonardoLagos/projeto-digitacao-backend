import { Repository } from "typeorm";
import { Textos } from "../database/entities/textos";
import { dataSource as db } from "../database/datasources/dataSource";

export class TextosService {
    textosRepository: Repository<Textos>;

    constructor(textosRepository = db.getRepository(Textos)) {
        this.textosRepository = textosRepository;
    }

    async getTextos(quantidade: number) {
        const itemDb = await this.textosRepository.find();
        let listaTextos = itemDb[Math.floor(Math.random() * itemDb.length)].texto;

        for (let i = 1; i < quantidade; i++) {
            listaTextos += ' ' + itemDb[Math.floor(Math.random() * itemDb.length)].texto;
        }

        if (itemDb instanceof Error) {
            return new Error("Erro ao buscar textos");
        }

        return listaTextos;
    }
    async getTextoById(id) {
        return await this.textosRepository.findOne(id);
    }
    async createTexto(texto) {
        return await this.textosRepository.save(texto);
    }
    async updateTexto(id, texto) {
        return await this.textosRepository.update(id, texto);
    }
    async deleteTexto(id) {
        return await this.textosRepository.delete(id);
    }
}