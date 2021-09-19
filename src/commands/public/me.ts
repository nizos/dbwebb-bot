import { SlashCommandBuilder } from '@discordjs/builders'
import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Me: Command = {
  data: new SlashCommandBuilder()
    .setName('me')
    .setDescription('Visa användarens me-sida'),
  async execute(interaction) {
    console.log(interaction)

    const { author, channel } = interaction
    await channel.send('Hello from me!')
    return
  },
}
