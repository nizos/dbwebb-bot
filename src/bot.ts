import { singleton } from '@aurelia/kernel'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Collection } from 'discord.js'
import fs from 'fs'
import { Client } from './client'
import { Commands } from './commands/commands'
import { Config } from './config'
import { Fetcher } from './services/fetcher'

@singleton
export class Bot {
  constructor(
    private readonly client: Client,
    private readonly config: Config,
    private readonly fetcher: Fetcher,
    private readonly commands: Commands,
  ) {}

  async listen(): Promise<string> {
    const BOT_TOKEN = process.env.BOT_TOKEN
    const GUILD_ID = process.env.GUILD_ID
    await this.fetcher.initialize()

    // this was already initialized in Client?
    // again, maybe put it in the DI container
    this.client.commands = new Collection()

    const botCommands = await this.getBotCommands()

    this.client.once('ready', () => {
      this.onReady(botCommands, BOT_TOKEN, GUILD_ID)
    })

    this.client.on('interactionCreate', async (interaction) => {
      console.log('Bot interaction: ', interaction)
      if (!interaction.isCommand()) return
      try {
        await this.commands.execute(interaction)
      } catch (error) {
        if (error) console.error(error)
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        })
      }
    })
    return this.client.login(this.config.token)
  }

  private async onReady(
    botCommands: any[],
    BOT_TOKEN: string,
    GUILD_ID: string,
  ) {
    console.log('Ready!')
    const REST_VER = { version: '9' }
    const COMMANDS = { body: botCommands }
    const CLIENT_ID = this.client.user.id
    const rest = new REST(REST_VER).setToken(BOT_TOKEN)

    try {
      if (!GUILD_ID) {
        await rest.put(Routes.applicationCommands(CLIENT_ID), COMMANDS)
        console.log('Successfully registered application commands.')
      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
          COMMANDS,
        )
        console.log('Successfully registered application test commands.')
      }
    } catch (error) {
      if (error) console.error(error)
    }
  }

  private async getBotCommands() {
    const ret = []
    for (const file of this.getCommandFiles()) {
      const command = await import(`./commands/public/${file}`)
      const commandData = Object.values(command)[0]['data'].toJSON()
      console.log('commandData: ', commandData)
      ret.push(commandData)
      // should probably not be done here
      this.client.commands.set(commandData.name, command)
    }
    return ret
  }

  private getCommandFiles() {
    const commandFiles = fs
      .readdirSync('./src/commands/public')
      .filter((file) => file.endsWith('.ts'))
    console.log('commandFiles: ', commandFiles)
    return commandFiles
  }
}
