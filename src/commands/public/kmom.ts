import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Kmom: Command = {
  name: 'kmom',
  description: 'Visa kursmoment.',
  run: async (message: Message) => {
    console.log(message)

    const { author, channel } = message
    await channel.send('Hello from kmom!')
    return
  },
}
