import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { dataSource as db } from "../database/datasources/dataSource";
import { Users } from "../database/entities/users";

export class UsersService {
  usersRepository: Repository<Users>;

  constructor(usersRepository = db.getRepository(Users)) {
    this.usersRepository = usersRepository;
  }

  async login(email: string, password: string, googleId: string) {
    let itemDb: Users;
    if (googleId) {
      itemDb = await this.usersRepository.findOne({
        where: { googleId },
      });
    } else {
      itemDb = await this.usersRepository.findOne({
        where: { email, password },
      });
    }

    if (!itemDb) {
      throw new Error("Usuário e/ou senha incorretos!");
    }

    if (itemDb.status == "inativo") {
      throw new Error("Usuário inativo!");
    }

    const token = jwt.sign(
      {
        id: itemDb.id,
        email: itemDb.email,
        nome: itemDb.name,
        foto_perfil: itemDb.profilePicture,
      },
      "teste",
      { expiresIn: 3600 }
    );
    return token;
  }

  async register(
    name: string,
    email: string,
    password: string,
    googleId: string,
    profilePicture: string
  ) {
    const itemDb = await this.usersRepository.findOne({
      where: { email, googleId, profilePicture },
    });

    if (itemDb) {
      throw new Error("Usuario já cadastrado!");
    }

    const user = new Users();
    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;
    user.googleId = googleId;
    user.profilePicture = profilePicture;
    user.status = "ativo";
    await this.usersRepository.save(user);

    return user;
  }

  async getDataByToken(token: string) {
    const decoded = jwt.verify(token, "teste");

    if (!decoded) {
      throw new Error("Usuário não encontrado!");
    }

    return decoded;
  }
}
