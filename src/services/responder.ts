import { Message } from 'discord.js'
import { Commands } from '../commands/commands'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'

@injectable()
export class Responder {
  private commands: Commands
  constructor(@inject(TYPES.Commands) commands: Commands) {
    this.commands = commands
  }
  async handle(message: Message): Promise<Message | Message[]> {
    const [command, ...args] = message.content.slice(1).split(' ')
    console.log(command)

    switch (command) {
      // case 'admin':
      //   await this.commands.execute('admin', message)
      //   break
      // case 'akr':
      //   await this.commands.execute('akr', message)
      //   break
      // case 'env':
      //   await this.commands.execute('env', message)
      //   break
      // case 'guide':
      //   await this.commands.execute('guide', message)
      //   break
      // case 'kmom':
      //   await this.commands.execute('kmom', message)
      //   break
      // case 'kunskap':
      //   await this.commands.execute('kunskap', message)
      //   break
      // case 'kurs':
      //   await this.commands.execute('kurs', message)
      //   break
      // case 'labb':
      //   await this.commands.execute('labb', message)
      //   break
      // case 'ping':
      //   await this.commands.execute('ping', message)
      //   break
      // case 'me':
      //   await this.commands.execute('me', message)
      //   break
      // case 'uppgift':
      //   await this.commands.execute('uppgift', message)
      //   break
      default:
        return
    }
  }
}
