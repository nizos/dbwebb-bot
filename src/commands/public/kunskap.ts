import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Kunskap: Command = {
  name: 'kunskap',
  description: 'Visar en kunskapsbank artikel.',
  run: async (message: Message) => {
    console.log(message)

    const { author, channel } = message
    await channel.send('Hello from kunskap!')
    return
  },
}
