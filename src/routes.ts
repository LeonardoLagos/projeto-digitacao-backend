import { Router } from "express";
import { HistoricoUsuariosController } from "./controllers/historicoUsuariosController";
import { TextosController } from "./controllers/textosController";

const routes = Router();
routes.get("/", new TextosController().retornaTextos);
routes.post("/historico", new HistoricoUsuariosController().cadastraHistoricoUsuarios);
routes.get("/historico", new HistoricoUsuariosController().buscaHistoricoPorUsuario);
routes.get("/erros", new HistoricoUsuariosController().buscaGraficoErrosPorUsuario);

export default routes;