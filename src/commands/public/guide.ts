import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'

export const Guide: Command = {
  data: new SlashCommandBuilder()
    .setName('guide')
    .setDescription('Visar en guide artikel'),
  async execute(interaction) {
    // Create response and send it
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle('Guide')
    messageEmbed.setDescription('Hello from guide!')
    interaction.reply({ embeds: [messageEmbed] })
    return
  },
}
