import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'

export const Kunskap: Command = {
  data: new SlashCommandBuilder()
    .setName('kunskap')
    .setDescription('Visar en kunskapsbank artikel'),
  async execute(interaction) {
    // Create response and send it
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle('Kunskap')
    messageEmbed.setDescription('Hello from kunskap!')
    interaction.reply({ embeds: [messageEmbed] })
    return
  },
}
