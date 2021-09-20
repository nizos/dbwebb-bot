import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'

export const Kmom: Command = {
  data: new SlashCommandBuilder()
    .setName('kmom')
    .setDescription('Visar kursmoment'),
  async execute(interaction) {
    // Create response and send it
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle('Kmom')
    messageEmbed.setDescription('Hello from kmom!')
    interaction.reply({ embeds: [messageEmbed] })
    return
  },
}
