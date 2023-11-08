import {Router} from "express"
import { textosController } from "./controllers/textosController";

const routes = Router();
routes.get("/", new textosController().pesquisa);

export default routes;