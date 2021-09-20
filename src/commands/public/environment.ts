import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'

export const Environment: Command = {
  data: new SlashCommandBuilder()
    .setName('env')
    .setDescription('Visar användarens utvecklingsmiljö'),
  async execute(interaction) {
    // Create response and send it
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle('Env')
    messageEmbed.setDescription('Hello from env!')
    interaction.reply({ embeds: [messageEmbed] })
    return
  },
}
