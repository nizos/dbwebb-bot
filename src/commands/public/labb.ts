import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../interfaces/command";

export const Labb: Command = {
    name: "labb",
    description: "Visar labbmiljö instruktioner.",
    run: async (message: Message) => {
        console.log(message);

        const { author, channel } = message;
        await channel.send("Hello from labb!");
        return;
    }
}