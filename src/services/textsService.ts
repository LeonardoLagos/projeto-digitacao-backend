import { Repository } from "typeorm";
import { dataSource as db } from "../database/datasources/dataSource";
import { Texts } from "../database/entities/texts";

export class TextsService {
  textsRepository: Repository<Texts>;

  constructor(textsRepository = db.getRepository(Texts)) {
    this.textsRepository = textsRepository;
  }

  async getAmount(amount: number) {
    const itemDb = await this.textsRepository.find();
    let textsList = itemDb[Math.floor(Math.random() * itemDb.length)].text;

    for (let i = 1; i < amount; i++) {
      textsList += " " + itemDb[Math.floor(Math.random() * itemDb.length)].text;
    }

    if (itemDb instanceof Error) {
      return new Error("Erro ao buscar textos");
    }
    return textsList;
  }

  async getTextsbyCategory(category: string, quantidade: number) {
    const itemDb = await this.textsRepository.find({
      where: { category },
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

  async updateTexts(text: Texts) {
    const itemDb = await this.textsRepository.update(text.id, text);
    if (itemDb instanceof Error) {
      return new Error("Erro ao atualizar textos");
    }
    return itemDb;
  }
}
