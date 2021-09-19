import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../../interfaces/command'

export const Ping: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong')
    .addStringOption((option) =>
      option
        .setName('namn')
        .setDescription('kursnamn')
        .setRequired(true)
        .addChoice('python', 'gif_funny')
        .addChoice('vlinux', 'gif_meme')
        .addChoice('htmlphp', 'gif_movie'),
    )
    .addStringOption((option) =>
      option
        .setName('version')
        .setDescription('Kurs version')
        .setRequired(false)
        .addChoice('1', 'kurs-v1')
        .addChoice('2', 'kurs-v2')
        .addChoice('3', 'kurs-v3'),
    ),
  async execute(interaction) {
    interaction.reply({ content: 'Pong' })
  },
}
