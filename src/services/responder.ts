import { singleton } from '@aurelia/kernel'
import { Message } from 'discord.js'

@singleton
export class Responder {
  async handle(message: Message): Promise<Message | Message[]> {
    const [command, ..._args] = message.content.slice(1).split(' ')
    console.log(command)

    switch (command) {
      default:
        return
    }
  }
}
