import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Responder } from '../../services/responder'

export const Acronym: Command = {
  data: new SlashCommandBuilder()
    .setName('akr')
    .setDescription('Visar användarens bth-akronym')
    .addStringOption((option) =>
      option.setName('text').setDescription('användare').setRequired(false),
    ),
  async execute(interaction) {
    const responder = new Responder()
    const embed: MessageEmbed = await responder.getAcronym(interaction)
    await interaction.reply({ embeds: [embed] })
    return
  },
}
