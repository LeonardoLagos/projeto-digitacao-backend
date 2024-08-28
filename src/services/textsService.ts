import { Repository } from "typeorm";
import { dataSource as db } from "../database/datasources/dataSource";
import { Texts } from "../database/entities/texts";

export class TextsService {
  textsRepository: Repository<Texts>;

  constructor(textsRepository = db.getRepository(Texts)) {
    this.textsRepository = textsRepository;
  }

  async get(maxCount: number) {
    const itemDb = await this.textsRepository.find();
    let textList = itemDb[Math.floor(Math.random() * itemDb.length)].text;

    for (let i = 1; i < maxCount; i++) {
      textList += " " + itemDb[Math.floor(Math.random() * itemDb.length)].text;
    }

    if (itemDb instanceof Error) {
      return new Error("Erro ao buscar textos");
    }
    return textList;
  }

  async getbyCategory(category: string, count: number) {
    const itemDb = await this.textsRepository.find({
      where: { category },
    });
    let textList = itemDb[Math.floor(Math.random() * itemDb.length)].text;

    for (let i = 1; i < count; i++) {
      textList += " " + itemDb[Math.floor(Math.random() * itemDb.length)].text;
    }

    if (itemDb instanceof Error) {
      return new Error("Erro ao buscar textos");
    }
    return textList;
  }

  async getByStatus(status: string, count: number) {
    const itemDb = await this.textsRepository.find({
      where: { status: status },
    });

    let textList = itemDb[Math.floor(Math.random() * itemDb.length)].text;

    for (let i = 1; i < count; i++) {
      textList += " " + itemDb[Math.floor(Math.random() * itemDb.length)].text;
    }

    if (itemDb instanceof Error) {
      return new Error("Erro ao buscar textos");
    }
    return textList;
  }

  async getByCategoryNStatus(
    category: string,
    status: string,
    quantidade: number
  ) {
    const itemDb = await this.textsRepository.find({
      where: { category, status },
    });
    let textList = itemDb[Math.floor(Math.random() * itemDb.length)].text;

    for (let i = 1; i < quantidade; i++) {
      textList += " " + itemDb[Math.floor(Math.random() * itemDb.length)].text;
    }

    if (itemDb instanceof Error) {
      return new Error("Erro ao buscar textos");
    }
    return textList;
  }

  async getByCreationDate(createdAt: Date, quantidade: number) {
    const itemDb = await this.textsRepository.find({
      where: { createdAt },
    });
    let textList = itemDb[Math.floor(Math.random() * itemDb.length)].text;

    for (let i = 1; i < quantidade; i++) {
      textList += " " + itemDb[Math.floor(Math.random() * itemDb.length)].text;
    }

    if (itemDb instanceof Error) {
      return new Error("Erro ao buscar textos");
    }
    return textList;
  }

  async getByCreationDateNCategory(
    createdAt: Date,
    category: string,
    quantidade: number
  ) {
    const itemDb = await this.textsRepository.find({
      where: { createdAt, category },
    });
    let textList = itemDb[Math.floor(Math.random() * itemDb.length)].text;

    for (let i = 1; i < quantidade; i++) {
      textList += " " + itemDb[Math.floor(Math.random() * itemDb.length)].text;
    }

    if (itemDb instanceof Error) {
      return new Error("Erro ao buscar textos");
    }
    return textList;
  }

  async Update(
    id: string,
    text: string,
    category: string,
    createdAt: Date,
    status: string
  ) {
    const itemDb = await this.textsRepository.update(id, {
      text,
      category,
      createdAt,
      status,
    });
    if (itemDb instanceof Error) {
      return new Error("Erro ao atualizar textos");
    }
    return itemDb;
  }
}
