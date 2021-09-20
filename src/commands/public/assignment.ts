import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'

export const Assignment: Command = {
  data: new SlashCommandBuilder()
    .setName('uppgift')
    .setDescription('Visar en uppgift'),
  async execute(interaction) {
    // Create response and send it
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle('Uppgift')
    messageEmbed.setDescription('Hello from uppgift!')
    interaction.reply({ embeds: [messageEmbed] })
  },
}
