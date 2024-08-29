import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { dataSource as db } from "../database/datasources/dataSource";
import { Historic } from "../database/entities/historic";

interface contagemErros {
  numero_erros: number;
  caracter: string;
}

export class HistoricService {
  historicoTextosRepository: Repository<Historic>;

  constructor(historicoTextosRepository = db.getRepository(Historic)) {
    this.historicoTextosRepository = historicoTextosRepository;
  }

  async register(
    userId: string,
    text: string,
    hitCount: number,
    missCount: number,
    duration: number,
    textLength: number
  ) {
    const itemDb = await this.historicoTextosRepository.save({
      id: uuidv4(),
      userId,
      text,
      hitCount,
      missCount,
      duration,
      textLength,
    } as Historic);

    if (itemDb instanceof Error) {
      return new Error("Erro ao cadastrar historico");
    }
    return itemDb;
  }

  async searchByUserId(userId: string) {
    const itemDb = await this.historicoTextosRepository.find({
      where: { userId },
      select: ["hitCount", "missCount", "duration", "textLength", "createdAt"],
    });

    if (itemDb instanceof Error) {
      return new Error("Histórico vazio");
    }
    return itemDb;
  }
}
