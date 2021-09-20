import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'

export const Ping: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('svarar med pong'),
  async execute(interaction) {
    // Create response and send it
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle('Ping')
    messageEmbed.setDescription('Pong!')
    interaction.reply({ embeds: [messageEmbed] })
  },
}
