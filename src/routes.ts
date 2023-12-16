import { Router } from "express";
import { HistoricoTeclasDigitadasController } from "./controllers/historicoTeclasDigitadasController";
import { HistoricoTextosController } from "./controllers/historicoTextosController";
import { TextosController } from "./controllers/textosController";

const routes = Router();
routes.get("/", new TextosController().retornaTextos);
routes.post("/historico/textos", new HistoricoTextosController().cadastraHistoricoUsuarios);
routes.get("/historico/textos", new HistoricoTextosController().buscaHistoricoPorUsuario);

routes.post("/historico/teclas", new HistoricoTeclasDigitadasController().cadastraHistoricoTeclasDigitadas);
routes.get("/historico/teclas", new HistoricoTeclasDigitadasController().retornaPorcentagemTeclasDigitadasPorUsuario);

export default routes;