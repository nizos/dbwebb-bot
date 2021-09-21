import { singleton } from '@aurelia/kernel'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import { PrismaClient } from '@prisma/client'
import { Parser } from './parser'

@singleton
export class Responder {
  private readonly parser: Parser
  private readonly prisma: PrismaClient
  constructor() {
    this.parser = new Parser()
    this.prisma = new PrismaClient()
  }

  async searchCourse(interaction: CommandInteraction): Promise<MessageEmbed> {
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
    return messageEmbed
  }

  async searchGuide(interaction: CommandInteraction): Promise<MessageEmbed> {
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
    return messageEmbed
  }

  async searchKnowledge(
    interaction: CommandInteraction,
  ): Promise<MessageEmbed> {
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
    return messageEmbed
  }

  async searchLab(interaction: CommandInteraction): Promise<MessageEmbed> {
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
    return messageEmbed
  }

  async setAcronym(interaction: CommandInteraction): Promise<MessageEmbed> {
    const input = interaction.options.getString('text')
    console.log('interaction.user.id: ', interaction.user.id)
    console.log('input: ', input)
    const user = await this.prisma.user.upsert({
      where: { discord: interaction.user.id },
      update: { acr: input },
      create: { discord: interaction.user.id },
    })
    const newAcr = user.acr
    console.log('user: ', user)
    console.log('user.acr: ', user.acr)
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle('Akronym')
    messageEmbed.setDescription('BTH Akronym uppdaterad')
    messageEmbed.addField('Akronym', newAcr, false)
    messageEmbed.setAuthor(
      interaction.user.username,
      interaction.user.avatarURL(),
    )
    return messageEmbed
  }

  async setEnvironment(interaction: CommandInteraction): Promise<MessageEmbed> {
    const input = interaction.options.getString('text')
    const newEnv = this.parser.getEnvironment(input)
    const user = await this.prisma.user.upsert({
      where: { discord: interaction.user.id },
      update: {
        shell: newEnv.shell,
        terminal: newEnv.terminal,
        browser: newEnv.browser,
        editor: newEnv.editor,
        os: newEnv.os,
      },
      create: {
        discord: interaction.user.id,
        shell: newEnv.shell,
        terminal: newEnv.terminal,
        browser: newEnv.browser,
        editor: newEnv.editor,
        os: newEnv.os,
      },
    })
    const field = `Shell:      ${user.shell}
    Terminal:   ${user.shell}
    Browser:    ${user.shell}
    Editor:     ${user.shell}
    OS:         ${user.shell}`
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle(`${interaction.user.username}s Utvecklingsmiljö`)
    messageEmbed.addField('Utvecklingsmiljön:', field, false)
    messageEmbed.setAuthor(
      interaction.user.username,
      interaction.user.avatarURL(),
    )
    return messageEmbed
  }

  async getAcronym(interaction: CommandInteraction): Promise<MessageEmbed> {
    const input = interaction.options.getString('text')
    const discord = this.parser.getDiscordUser(input)
    console.log('Discord: ', discord)
    let user
    if (discord == '') {
      user = await this.prisma.user.findUnique({
        where: { discord: interaction.user.id },
      })
    } else {
      user = await this.prisma.user.findUnique({
        where: { discord: discord },
      })
    }

    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle('Akronym')
    messageEmbed.setDescription('BTH Akronym found')
    messageEmbed.addField('Akronym', user.acr, false)
    messageEmbed.setAuthor(
      interaction.user.username,
      interaction.user.avatarURL(),
    )
    return messageEmbed
  }

  async getEnvironment(interaction: CommandInteraction): Promise<MessageEmbed> {
    const input = interaction.options.getString('text')
    const discord = this.parser.getDiscordUser(input)
    console.log('Discord: ', discord)
    let user
    if (discord == '') {
      user = await this.prisma.user.findUnique({
        where: { discord: interaction.user.id },
      })
    } else {
      user = await this.prisma.user.findUnique({
        where: { discord: discord },
      })
    }
    const field = `Shell:      ${user.shell}
    Terminal:   ${user.terminal}
    Browser:    ${user.browser}
    Editor:     ${user.editor}
    OS:         ${user.os}`
    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle(`${interaction.user.username}s Utvecklingsmiljö`)
    messageEmbed.addField('Utvecklingsmiljön:', field, false)
    messageEmbed.setAuthor(
      interaction.user.username,
      interaction.user.avatarURL(),
    )
    return messageEmbed
  }
}
