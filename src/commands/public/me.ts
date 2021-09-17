import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../interfaces/command";

export const Me: Command = {
    name: "me",
    description: "Visa användarens me-sida",
    run: async (message: Message) => {
        console.log(message);

        const { author, channel } = message;
        await channel.send("Hello from me!");
        return;
    }
}