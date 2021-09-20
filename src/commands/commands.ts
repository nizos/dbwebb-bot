import { CommandInteraction } from 'discord.js'
import { Command } from '../interfaces/command'
import { Acronym } from './public/acronym'
import { Environment } from './public/environment'
import { Guide } from './public/guide'
import { Activity } from './public/activity'
import { Knowledge } from './public/knowledge'
import { Course } from './public/course'
import { Lab } from './public/lab'
import { Me } from './public/me'
import { Ping } from './public/ping'
import { Assignment } from './public/assignment'
import { Search } from './public/search'

export class Commands {
  list = new Map<string, Command>([
    ['akr', Acronym],
    ['env', Environment],
    ['guide', Guide],
    ['kmom', Activity],
    ['kunskap', Knowledge],
    ['kurs', Course],
    ['labb', Lab],
    ['me', Me],
    ['ping', Ping],
    ['sök', Search],
    ['uppgift', Assignment],
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
