import { Request, Response } from "express";
import { UsersService } from "src/services/usersService";

export class UsersController {
  usuariosService: UsersService;

  constructor(usuariosService = new UsersService()) {
    this.usuariosService = usuariosService;
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, senha, googleId } = req.body;
      const result = await this.usuariosService.login(email, senha, googleId);

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getDataByToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const result = await this.usuariosService.getDataByToken(token);

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password, googleId, profilePicture } = req.body;
      const result = await this.usuariosService.register(
        name,
        email,
        password,
        googleId,
        profilePicture
      );

      if (result instanceof Error) {
        return res.status(400).json({ message: result.message });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}
