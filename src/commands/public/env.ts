import { SlashCommandBuilder } from '@discordjs/builders'
import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Env: Command = {
  data: new SlashCommandBuilder()
    .setName('env')
    .setDescription('Visar användarens utvecklingsmiljö'),
  async execute(interaction) {
    console.log(interaction)

    const { author, channel } = interaction
    await channel.send('Hello from env!')
    return
  },
}
