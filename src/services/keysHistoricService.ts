import { Repository } from "typeorm";
import { dataSource as db } from "../database/datasources/dataSource";
import { KeysHistoric } from "../database/entities/keysHistoric";

interface errorCount {
  key: string;
  errorCount: number;
  hitCount: number;
  errorPercentage: number;
  hitPercentage: number;
  label: string;
}

export class KeysHistoricService {
  keysHistoricRepository: Repository<KeysHistoric>;

  constructor(keysHistoricRepository = db.getRepository(KeysHistoric)) {
    this.keysHistoricRepository = keysHistoricRepository;
  }

  async register(keysList: KeysHistoric[]) {
    const queryRunner = db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      keysList.map(async (key) => {
        const itemDb = await queryRunner.manager.save({
          userId: key.userId,
          rightKey: key.rightKey,
          pressedKey: key.pressedKey,
          data: new Date(),
        } as KeysHistoric);
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return new Error("Erro ao cadastrar historicoTeclasDigitadas");
    } finally {
      await queryRunner.release();
    }

    return { message: "Historico cadastrado!" };
  }

  async returnPrecision(userId: string) {
    const itemDb = await this.keysHistoricRepository.find({
      where: { userId },
    });

    if (itemDb instanceof Error) {
      return new Error("Erro ao buscar historicoTeclasDigitadas");
    }
    const keyList = [] as errorCount[];

    itemDb.map((item) => {
      let actualKey = keyList.find((erro) => erro.key === item.rightKey);
      if (actualKey === undefined) {
        keyList.push({
          key: item.rightKey,
          errorCount: 0,
          hitCount: 0,
          errorPercentage: 0,
          hitPercentage: 0,
          label: "",
        });
        actualKey = keyList.find((erro) => erro.key === item.rightKey);
      }

      if (item.rightKey !== item.pressedKey) {
        actualKey.errorCount++;
      } else {
        actualKey.hitCount++;
      }
    });

    keyList.forEach((item) => {
      const soma = item.errorCount + item.hitCount;
      item.errorPercentage = (item.errorCount / soma) * 100;
      item.hitPercentage = (item.hitCount / soma) * 100;
      item.label =
        Number(item.errorPercentage).toFixed(2).replace(".00", "") + "%";
    });
    return keyList;
  }
}
