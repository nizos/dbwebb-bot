import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'
import { Builder } from '../../services/builder'

const builder = new Builder()

export const Course: Command = {
  data: new SlashCommandBuilder()
    .setName('kurs')
    .setDescription('Visar kurs information')
    .addStringOption((option) =>
      option
        .setName('namn')
        .setDescription('kursnamn')
        .setRequired(true)
        .addChoices(builder.getCourseOptions()),
    )
    .addStringOption((option) =>
      option
        .setName('version')
        .setDescription('kursversion')
        .setRequired(false),
    ),
  async execute(interaction) {
    // Get user input from interaction
    const msg = interaction.options
    console.log('Command kurs - msg: ', msg)
    const name = interaction.options.getString('namn')
    const version = interaction.options.getString('version')
    console.log('Command kurs - name: ', name)
    console.log('Command kurs - version: ', version)

    let courseName: string
    if (name != 'search') {
      courseName = version ? name + '-v' + version : name
    } else {
      courseName = version
    }

    console.log('Command kurs - courseName: ', courseName)

    // Get course matching request
    const parser = new Parser()
    const course = await parser.getCourse(courseName)

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
