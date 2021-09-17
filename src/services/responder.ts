import { Message } from "discord.js";
import { Commands } from "../commands/commands";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class Responder {
    private commands: Commands;
    constructor(@inject(TYPES.Commands) commands: Commands
    ) {
        this.commands = commands;
    }
    async handle(message: Message): Promise<Message | Message[]> {
        const [command, ...args] = message.content.slice(1).split(' ');
        console.log(command);

        switch (command) {
            case 'ping':
                await message.reply({ content: 'pong'});
                break;
            case 'admin':
                await this.commands.admin.run(message);
                break;
            case 'akr':
                await this.commands.akr.run(message);
                break;
            case 'env':
                await this.commands.env.run(message);
                break;
            case 'guide':
                await this.commands.guide.run(message);
                break;
            case 'kmom':
                await this.commands.kmom.run(message);
                break;
            case 'kunskap':
                await this.commands.kunskap.run(message);
                break;
            case 'kurs':
                await this.commands.kurs.run(message);
                break;
            case 'labb':
                await this.commands.labb.run(message);
                break;
            case 'me':
                await this.commands.me.run(message);
                break;
            case 'uppgift':
                await this.commands.uppgift.run(message);
                break;
            default:
                return;
        }
    }
}