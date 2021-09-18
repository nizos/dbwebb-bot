import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Env: Command = {
  name: 'env',
  description: 'Visar användarens utvecklingsmiljö.',
  run: async (message: Message) => {
    console.log(message)

    const { author, channel } = message
    await channel.send('Hello from env!')
    return
  },
}
