import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { dataSource as db } from "../database/datasources/dataSource";
import { PressedKeys } from "../database/entities/pressedKeys";

interface contagemErros {
  caracter: string;
  numero_erros: number;
  numero_acertos: number;
  porcentagem_erros: number;
  porcentagem_acertos: number;
  label: string;
}

export class PressedKeysService {
  pressedKeysRepository: Repository<PressedKeys>;

  constructor(pressedKeysRepository = db.getRepository(PressedKeys)) {
    this.pressedKeysRepository = pressedKeysRepository;
  }

  async register(userId: string, pressedKey: string, correctKey: string) {
    const itemDb = await this.pressedKeysRepository.save({
      id: uuidv4(),
      userId,
      pressedKey,
      correctKey,
    } as PressedKeys);

    if (itemDb instanceof Error) {
      return new Error("Erro ao cadastrar historicoTeclasDigitadas");
    }
    return itemDb;
  }

  async getKeysPercentage(userId: string) {
    const itemDb = await this.pressedKeysRepository.find({
      where: { userId },
    });

    if (itemDb instanceof Error) {
      return new Error("Erro ao buscar historicoTeclasDigitadas");
    }
    const listaCaracteres = [] as contagemErros[];

    itemDb.forEach((item) => {
      let caracterAtual = listaCaracteres.find(
        (erro) => erro.caracter === item.correctKey
      );
      if (caracterAtual === undefined) {
        listaCaracteres.push({
          caracter: item.correctKey,
          numero_erros: 0,
          numero_acertos: 0,
          porcentagem_erros: 0,
          porcentagem_acertos: 0,
          label: "",
        });
        caracterAtual = listaCaracteres.find(
          (erro) => erro.caracter === item.correctKey
        );
      }

      if (item.correctKey !== item.pressedKey) {
        caracterAtual.numero_erros++;
      } else {
        caracterAtual.numero_acertos++;
      }
    });

    listaCaracteres.forEach((item) => {
      const soma = item.numero_erros + item.numero_acertos;
      item.porcentagem_erros = (item.numero_erros / soma) * 100;
      item.porcentagem_acertos = (item.numero_acertos / soma) * 100;
      item.label =
        Number(item.porcentagem_erros).toFixed(2).replace(".00", "") + "%";
    });
    return listaCaracteres;
  }
}
