import { SlashCommandBuilder } from '@discordjs/builders'
import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Akr: Command = {
  data: new SlashCommandBuilder()
    .setName('akr')
    .setDescription('Visar användarens bth-akronym'),
  async execute(interaction) {
    console.log(interaction)

    const { author, channel } = interaction
    await channel.send('Hello from akr!')
    return
  },
}
