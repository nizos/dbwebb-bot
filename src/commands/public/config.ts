import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Responder } from '../../services/responder'

export const Config: Command = {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('Set an acronym or env')
    .addStringOption((option) =>
      option
        .setName('type')
        .setDescription('Type of data to configure')
        .setRequired(true)
        .addChoice('Akr', 'akr')
        .addChoice('Env', 'env'),
    )
    .addStringOption((option) =>
      option.setName('text').setDescription('New value').setRequired(true),
    ),
  async execute(interaction) {
    // Get user input from interaction
    const responder = new Responder()
    const type = interaction.options.getString('type')

    const setAcronym = async (interaction: CommandInteraction) => {
      const embed: MessageEmbed = await responder.setAcronym(interaction)
      await interaction.reply({ embeds: [embed] })
    }

    const setEnvironment = async (interaction: CommandInteraction) => {
      const embed: MessageEmbed = await responder.setEnvironment(interaction)
      await interaction.reply({ embeds: [embed] })
    }

    // Handle request
    switch (type) {
      case 'akr':
        await setAcronym(interaction)
        break
      case 'env':
        await setEnvironment(interaction)
        break
      default:
        break
    }
  },
}
