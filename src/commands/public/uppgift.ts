import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../../interfaces/command'

export const Uppgift: Command = {
  data: new SlashCommandBuilder()
    .setName('uppgift')
    .setDescription('Visar en uppgift'),
  async execute(interaction) {
    interaction.reply({ content: 'Hello from uppgift!' })
  },
}
