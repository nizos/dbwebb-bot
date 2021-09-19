import { SlashCommandBuilder } from '@discordjs/builders'
import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Labb: Command = {
  data: new SlashCommandBuilder()
    .setName('labb')
    .setDescription('Visar labbmiljö instruktioner'),
  async execute(interaction) {
    console.log(interaction)

    const { author, channel } = interaction
    await channel.send('Hello from labb!')
    return
  },
}
