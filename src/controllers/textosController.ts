import { ChatGPTUnofficialProxyAPI } from 'chatgpt';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import Authenticator from 'openai-token'

dotenv.config()

export class textosController {
    pesquisa = async (request: Request, response: Response): Promise<Response> => {
        const authenticator = new Authenticator("gpteste11@gmail.com", "lolislife123");
        await authenticator.begin()
        const token = await authenticator.getAccessToken()
        // const api = new ChatGPTUnofficialProxyAPI({
        //     accessToken: token
        // })

        // const res = await api.sendMessage('voce nesse exato momento esta dentro de uma api node. preciso que voce me retorne um texto aleatório com 400 caracteres,'
        //     + ' quero apenas o texto. nao diga nada alem disso.')
        return response.json({ message: token }).status(200);
    }
}