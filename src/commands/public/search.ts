import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'
import { Responder } from '../../services/responder'

export const Search: Command = {
  data: new SlashCommandBuilder()
    .setName('sök')
    .setDescription('Gör en sökning')
    .addStringOption((option) =>
      option
        .setName('kategori')
        .setDescription('Sök kategori')
        .setRequired(true)
        .addChoice('Kurs', 'kurs')
        .addChoice('Kunskap', 'kunskap'),
    )
    .addStringOption((option) =>
      option.setName('text').setDescription('Sök text').setRequired(true),
    ),
  async execute(interaction) {
    // Get user input from interaction
    const responder = new Responder()
    const category = interaction.options.getString('kategori')

    const searchEverything = async (interaction: CommandInteraction) => {
      const embeds = await responder.searchCourse(interaction)
      await interaction.reply(embeds)
    }

    const searchActivity = async (interaction: CommandInteraction) => {
      const embeds = await responder.searchCourse(interaction)
      await interaction.reply(embeds)
    }

    const searchAssignment = async (interaction: CommandInteraction) => {
      const embeds = await responder.searchCourse(interaction)
      await interaction.reply(embeds)
    }

    const searchCourse = async (interaction: CommandInteraction) => {
      const embeds = await responder.searchCourse(interaction)
      await interaction.reply(embeds)
    }

    const searchGuide = async (interaction: CommandInteraction) => {
      const embeds = await responder.searchCourse(interaction)
      await interaction.reply(embeds)
    }

    const searchKnowledge = async (interaction: CommandInteraction) => {
      const embeds = await responder.searchKnowledge(interaction)
      await interaction.reply(embeds)
    }

    const searchLab = async (interaction: CommandInteraction) => {
      const embeds = await responder.searchCourse(interaction)
      await interaction.reply(embeds)
    }

    // Handle search
    switch (category) {
      case 'allt':
        await searchEverything(interaction)
        break
      case 'kmom':
        await searchActivity(interaction)
        break
      case 'kurs':
        await searchCourse(interaction)
        break
      case 'kunskap':
        await searchKnowledge(interaction)
        break
      case 'labb':
        await searchLab(interaction)
        break
      case 'guide':
        await searchGuide(interaction)
        break
      case 'uppgift':
        await searchAssignment(interaction)
        break
      default:
        await searchEverything(interaction)
        break
    }
  },
}
