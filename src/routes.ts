import {Router} from "express"
import { TextosController } from "./controllers/textosController";

const routes = Router();
routes.get("/", new TextosController().retornaTextos);

export default routes;