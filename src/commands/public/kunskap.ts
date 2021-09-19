import { SlashCommandBuilder } from '@discordjs/builders'
import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Kunskap: Command = {
  data: new SlashCommandBuilder()
    .setName('kunskap')
    .setDescription('Visar en kunskapsbank artikel'),
  async execute(interaction) {
    console.log(interaction)

    const { author, channel } = interaction
    await channel.send('Hello from kunskap!')
    return
  },
}
