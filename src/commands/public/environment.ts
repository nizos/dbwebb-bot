import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Responder } from '../../services/responder'

export const Environment: Command = {
  data: new SlashCommandBuilder()
    .setName('env')
    .setDescription('Visar användarens utvecklingsmiljö')
    .addStringOption((option) =>
      option.setName('text').setDescription('användare').setRequired(false),
    ),
  async execute(interaction) {
    const responder = new Responder()
    const embed: MessageEmbed = await responder.getEnvironment(interaction)
    await interaction.reply({ embeds: [embed] })
    return
  },
}
