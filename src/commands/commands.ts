import { Command } from '../interfaces/command'
import { Admin } from './public/admin'
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
  public list: Map<string, Command>

  constructor() {
    this.list = new Map()
    this.list.set('admin', Admin)
    this.list.set('akr', Akr)
    this.list.set('env', Env)
    this.list.set('guide', Guide)
    this.list.set('kmom', Kmom)
    this.list.set('kunskap', Kunskap)
    this.list.set('kurs', Kurs)
    this.list.set('labb', Labb)
    this.list.set('me', Me)
    this.list.set('ping', Ping)
    this.list.set('uppgift', Uppgift)
  }

  public get(command) {
    return this.list.get(command)
  }

  public async execute(interaction) {
    const commandName = interaction['commandName']
    console.log('commandName: ', commandName)
    return await this.list.get(commandName).execute(interaction)
  }
}
