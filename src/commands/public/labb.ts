import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'

export const Labb: Command = {
  data: new SlashCommandBuilder()
    .setName('labb')
    .setDescription('Visar labbmiljö instruktioner'),
  async execute(interaction) {
    // Create response and send it
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle('Labb')
    messageEmbed.setDescription('Hello from labb!')
    interaction.reply({ embeds: [messageEmbed] })
    return
  },
}
