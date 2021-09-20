import { singleton } from '@aurelia/kernel'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import { Parser } from './parser'

@singleton
export class Responder {
  private readonly parser: Parser
  constructor() {
    this.parser = new Parser()
  }

  async searchCourse(interaction: CommandInteraction) {
    const search = interaction.options.getString('text')
    const course = await this.parser.getCourse(search)
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
    return { embeds: [messageEmbed] }
  }

  async searchGuide(interaction: CommandInteraction) {
    const search = interaction.options.getString('text')
    const course = await this.parser.getCourse(search)
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
    return { embeds: [messageEmbed] }
  }

  async searchKnowledge(interaction: CommandInteraction) {
    const text = interaction.options.getString('text')
    const results = await this.parser.findKnowledgeArticle(text)
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle(results.title)
    messageEmbed.setURL(results.url)
    messageEmbed.setDescription(results.description)
    messageEmbed.addField('Innehåll', results.headings, false)
    messageEmbed.addField('Liknande träffar', results.related, false)
    messageEmbed.setAuthor(
      results.author.name,
      results.author.image,
      results.author.url,
    )
    messageEmbed.setFooter(`Last revision: ${results.date}`)
    return { embeds: [messageEmbed] }
  }

  async searchLab(interaction: CommandInteraction) {
    const search = interaction.options.getString('text')
    const course = await this.parser.getCourse(search)
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
    return { embeds: [messageEmbed] }
  }
}
