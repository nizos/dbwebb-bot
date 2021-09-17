import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { Handler } from "./services/handler";

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private handler: Handler;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.Handler) handler: Handler) {
            this.client = client;
            this.token = token;
            this.handler = handler;
    }

    public listen(): Promise<string> {
        this.client.on('messageCreate', (message: Message) => {
            this.handler.handle(message).then(() => {
                console.log("Response sent!");
            }).catch(() => {
                console.log("Response not sent!")
            })
        });
        return this.client.login(this.token);
    }
}