import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'

export const Akr: Command = {
  data: new SlashCommandBuilder()
    .setName('akr')
    .setDescription('Visar användarens bth-akronym'),
  async execute(interaction) {
    // Create response and send it
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle('Akr')
    messageEmbed.setDescription('Hello from akr!')
    interaction.reply({ embeds: [messageEmbed] })
    return
  },
}
