import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Akr: Command = {
  name: 'akr',
  description: 'Visar användarens bth-akronym.',
  run: async (message: Message) => {
    console.log(message)

    const { author, channel } = message
    await channel.send('Hello from akr!')
    return
  },
}
