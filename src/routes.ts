import { Router } from "express";
import { HistoricoTeclasDigitadasController } from "./controllers/historicoTeclasDigitadasController";
import { HistoricoUsuariosController } from "./controllers/historicoTextosController";
import { TextosController } from "./controllers/textosController";

const routes = Router();
routes.get("/", new TextosController().retornaTextos);
routes.post("/historico/textos", new HistoricoUsuariosController().cadastraHistoricoUsuarios);
routes.get("/historico/textos", new HistoricoUsuariosController().buscaHistoricoPorUsuario);
routes.post("/historico/teclas", new HistoricoTeclasDigitadasController().cadastraHistoricoTeclasDigitadas);
routes.get("/historico/teclas", new HistoricoTeclasDigitadasController().retornaPorcentagemTeclasDigitadasPorUsuario);
routes.get("/erros/quantidade", new HistoricoUsuariosController().buscaQuantidadeErrosPorUsuario);

export default routes;