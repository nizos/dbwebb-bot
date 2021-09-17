import { Message } from "discord.js";

export interface Command {
    name: string;
    description: string;
    run: (message: Message) => Promise<void>;
}