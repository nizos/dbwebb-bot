import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'

export const Me: Command = {
  data: new SlashCommandBuilder()
    .setName('me')
    .setDescription('Visa användarens me-sida'),
  async execute(interaction) {
    // Create response and send it
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle('Me')
    messageEmbed.setDescription('Hello from me!')
    interaction.reply({ embeds: [messageEmbed] })
    return
  },
}
