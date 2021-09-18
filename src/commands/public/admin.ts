import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces/command'

export const Admin: Command = {
  name: 'admin',
  description: 'Admin komandon.',
  run: async (message: Message) => {
    console.log(message)

    const { author, channel } = message
    await channel.send('Hello from admin!')
    return
  },
}
