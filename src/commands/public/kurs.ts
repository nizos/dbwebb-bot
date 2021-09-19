import { SlashCommandBuilder } from '@discordjs/builders'
import { Message, MessageEmbed } from 'discord.js'
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
        .addChoice('Python', 'python')
        .addChoice('VLinux', 'vlinux')
        .addChoice('Design', 'design'),
    )
    .addStringOption((option) =>
      option
        .setName('version')
        .setDescription('Kurs version')
        .setRequired(false)
        .addChoice('1', 'kurs-v1')
        .addChoice('2', 'kurs-v2')
        .addChoice('3', 'kurs-v3'),
    ),
  async execute(interaction) {
    const parser = new Parser()
    const { channel, content } = interaction
    const name = content.slice(6)
    const course = await parser.getCourse(name)
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
    await channel.send({ embeds: [messageEmbed] })
    return
  },
}
