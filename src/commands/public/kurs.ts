import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
import { Parser } from '../../services/parser'

export const Kurs: Command = {
  name: 'kurs',
  description: 'Visar kurs information.',
  run: async (message: Message) => {
    const parser = new Parser()
    const { channel, content } = message
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
