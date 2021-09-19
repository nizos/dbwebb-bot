import { SlashCommandBuilder } from '@discordjs/builders'
import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Admin: Command = {
  data: new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Admin komandon'),
  async execute(interaction) {
    console.log(interaction)

    const { author, channel } = interaction
    await channel.send('Hello from admin!')
    return
  },
}
