import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../interfaces/command";

export const Guide: Command = {
    name: "guide",
    description: "Visar en guide artikel.",
    run: async (message: Message) => {
        console.log(message);

        const { author, channel } = message;
        await channel.send("Hello from kunskap!");
        return;
    }
}