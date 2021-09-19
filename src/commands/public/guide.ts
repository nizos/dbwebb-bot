import { SlashCommandBuilder } from '@discordjs/builders'
import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Guide: Command = {
  data: new SlashCommandBuilder()
    .setName('guide')
    .setDescription('Visar en guide artikel'),
  async execute(interaction) {
    console.log(interaction)

    const { author, channel } = interaction
    await channel.send('Hello from kunskap!')
    return
  },
}
