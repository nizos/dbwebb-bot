import { SlashCommandBuilder } from '@discordjs/builders'
import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Kmom: Command = {
  data: new SlashCommandBuilder()
    .setName('kmom')
    .setDescription('Visar kursmoment'),
  async execute(interaction) {
    console.log(interaction)

    const { author, channel } = interaction
    await channel.send('Hello from kmom!')
    return
  },
}
