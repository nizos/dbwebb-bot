import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'

export const Kurs: Command = {
  data: new SlashCommandBuilder()
    .setName('kurs')
    .setDescription('Visar kurs information')
    .addStringOption((option) =>
      option
        .setName('namn')
        .setDescription('kursnamn')
        .setRequired(true)
        .addChoice('python', 'python')
        .addChoice('vlinux', 'vlinux')
        .addChoice('design', 'design'),
    )
    .addStringOption((option) =>
      option
        .setName('version')
        .setDescription('Kurs version')
        .setRequired(false)
        .addChoice('1', 'v1')
        .addChoice('2', 'v2')
        .addChoice('3', 'v3'),
    ),
  async execute(interaction) {
    // Get user input from interaction
    const name = interaction.options.getString('namn')
    const version = interaction.options.getString('version')
    let courseName: string = name.toLowerCase()
    if (version) {
      courseName += '-' + version.toLowerCase()
    }

    // Get course matching request
    const parser = new Parser()
    const course = await parser.getCourse(name)

    // Create response and send it
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle(course.title)
    messageEmbed.setURL(course.url)
    messageEmbed.setDescription(course.description)
    messageEmbed.addField('Innehåll', course.headings, false)
    messageEmbed.setAuthor(
      course.author.name,
      course.author.image,
      course.author.url,
    )
    messageEmbed.setFooter(`Last revision: ${course.date}`)
    await interaction.reply({ embeds: [messageEmbed] })
    return
  },
}
