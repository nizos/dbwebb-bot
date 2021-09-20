import { CommandInteraction } from 'discord.js'
import { Command } from '../interfaces/command'
import { Akr } from './public/akr'
import { Env } from './public/env'
import { Guide } from './public/guide'
import { Kmom } from './public/kmom'
import { Kunskap } from './public/kunskap'
import { Kurs } from './public/kurs'
import { Labb } from './public/labb'
import { Me } from './public/me'
import { Ping } from './public/ping'
import { Uppgift } from './public/uppgift'

export class Commands {
  list = new Map<string, Command>([
    ['akr', Akr],
    ['env', Env],
    ['guide', Guide],
    ['kmom', Kmom],
    ['kunskap', Kunskap],
    ['kurs', Kurs],
    ['labb', Labb],
    ['me', Me],
    ['ping', Ping],
    ['uppgift', Uppgift],
  ])

  /**
   * maybe make it an enum?
   *
   * enum Command {
   *   admin = 'admin'
   * }
   *
   * get(Command.admin)
   */
  get(command: string) {
    return this.list.get(command)
  }

  async execute(interaction: CommandInteraction) {
    const commandName = interaction.commandName
    console.log('commandName: ', commandName)
    return await this.list.get(commandName).execute(interaction)
  }
}
