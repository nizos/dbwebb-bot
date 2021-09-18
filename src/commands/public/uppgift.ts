import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'
const axios = require('axios')

const uppgift_data = {
  title: 'Python med värden och variabler',
  url: 'https://dbwebb.se/uppgift/python-med-varden-och-variabler',
  description:
    'En laboration där du jobbar igenom grunderna i Python med värden, variabler och grundläggande datatyper.',
  date: '2017-08-28',
  author: {
    name: 'Mikael Roos',
    url: 'https://dbwebb.se/author/mos',
    image:
      'https://www.gravatar.com/avatar/02f8a1876759ad09f215055ff17cc318.jpg',
  },
  contents: [
    {
      name: 'Förkunskaper',
      url: 'https://dbwebb.se/uppgift/python-med-varden-och-variabler#forkunskaper',
      level: 1,
    },
    {
      name: 'Hämta labben',
      url: 'https://dbwebb.se/uppgift/python-med-varden-och-variabler#hamta',
      level: 1,
    },
    {
      name: 'Krav',
      url: 'https://dbwebb.se/uppgift/python-med-varden-och-variabler#krav',
      level: 1,
    },
    {
      name: 'Tips från coachen',
      url: 'https://dbwebb.se/uppgift/python-med-varden-och-variabler#tips',
      level: 1,
    },
    {
      name: 'Versioner av labben',
      url: 'https://dbwebb.se/uppgift/python-med-varden-och-variabler#version',
      level: 1,
    },
    {
      name: 'Revision history',
      url: 'https://dbwebb.se/uppgift/python-med-varden-och-variabler#revision',
      level: 1,
    },
  ],
}

export const Uppgift: Command = {
  name: 'uppgift',
  description: 'Visar en uppgift.',
  run: async (message: Message) => {
    console.log(message.content)

    axios
      .get(
        'https://api.github.com/repos/dbwebb-se/website/contents/content/uppgift',
      )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    const data = uppgift_data
    const { author, channel, content } = message
    const args = content.split(' ').slice(1).join(' ')

    const messageEmbed = new MessageEmbed()
    messageEmbed.setTitle(data.title)
    messageEmbed.setURL(data.url)
    messageEmbed.setDescription(data.description)

    let contents = ''
    for (const section of data.contents) {
      contents += `[${section.name}](${section.url})\n`
    }
    messageEmbed.addField('Innehåll', contents, false)

    messageEmbed.setAuthor(data.author.name, data.author.image, data.author.url)
    messageEmbed.setFooter(`Last revision: ${data.date}`)
    await channel.send({ embeds: [messageEmbed] })
    return
  },
}
