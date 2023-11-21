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
    
    async getTextosPorCategoria(categoria: string, quantidade: number) {
        const itemDb = await this.textosRepository.find({ where: { categoria: categoria }});
        let listaTextos = itemDb[Math.floor(Math.random() * itemDb.length)].texto;

        for (let i = 1; i < quantidade; i++) {
            listaTextos += ' ' + itemDb[Math.floor(Math.random() * itemDb.length)].texto;
        }

        if (itemDb instanceof Error) {
            return new Error("Erro ao buscar textos");
        }
        return listaTextos;
    }

    async getTextosPorStatus(status: string, quantidade: number) {
        const itemDb = await this.textosRepository.find({ where: { status: status }});
        let listaTextos = itemDb[Math.floor(Math.random() * itemDb.length)].texto;

        for (let i = 1; i < quantidade; i++) {
            listaTextos += ' ' + itemDb[Math.floor(Math.random() * itemDb.length)].texto;
        }

        if (itemDb instanceof Error) {
            return new Error("Erro ao buscar textos");
        }
        return listaTextos;
    }

    async getTextosPorCategoriaEStatus(categoria: string, status: string, quantidade: number) {
        const itemDb = await this.textosRepository.find({ where: { categoria: categoria, status: status }});
        let listaTextos = itemDb[Math.floor(Math.random() * itemDb.length)].texto;

        for (let i = 1; i < quantidade; i++) {
            listaTextos += ' ' + itemDb[Math.floor(Math.random() * itemDb.length)].texto;
        }

        if (itemDb instanceof Error) {
            return new Error("Erro ao buscar textos");
        }
        return listaTextos;
    }

    async getTextosPorData(data: Date, quantidade: number) {
        const itemDb = await this.textosRepository.find({ where: { data: data }});
        let listaTextos = itemDb[Math.floor(Math.random() * itemDb.length)].texto;

        for (let i = 1; i < quantidade; i++) {
            listaTextos += ' ' + itemDb[Math.floor(Math.random() * itemDb.length)].texto;
        }

        if (itemDb instanceof Error) {
            return new Error("Erro ao buscar textos");
        }
        return listaTextos;
    }

    async getTextosPorDataECategoria(data: Date, categoria: string, quantidade: number) {
        const itemDb = await this.textosRepository.find({ where: { data: data, categoria: categoria }});
        let listaTextos = itemDb[Math.floor(Math.random() * itemDb.length)].texto;

        for (let i = 1; i < quantidade; i++) {
            listaTextos += ' ' + itemDb[Math.floor(Math.random() * itemDb.length)].texto;
        }

        if (itemDb instanceof Error) {
            return new Error("Erro ao buscar textos");
        }
        return listaTextos;
    }

    async getUpdateTextos(id: number, texto: string, categoria: string, data: Date, status: string) {
        const itemDb = await this.textosRepository.update(id, { texto: texto, categoria: categoria, data: data, status: status });
        if (itemDb instanceof Error) {
            return new Error("Erro ao atualizar textos");
        }
        return itemDb;
    }
}