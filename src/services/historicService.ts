import { Repository } from "typeorm";
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
    correctionCount: number,
    duration: number,
    wpm: number
  ) {
    const itemDb = await this.historicoTextosRepository.save({
      userId,
      text,
      status: "ativo",
      hitCount,
      missCount,
      correctionCount,
      duration,
      wpm,
    });

    if (itemDb instanceof Error) {
      return new Error("Erro ao cadastrar historico");
    }
    return itemDb;
  }

  async searchByUserId(userId: string) {
    const itemDb = await this.historicoTextosRepository.find({
      where: { userId },
      select: [
        "fullText",
        "hitCount",
        "missCount",
        "correctionCount",
        "duration",
        "wpm",
        "createdAt",
      ],
    });

    if (itemDb instanceof Error) {
      return new Error("Histórico vazio");
    }
    return itemDb;
  }
}
