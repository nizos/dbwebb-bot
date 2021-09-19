import { Message, Intents, Collection } from 'discord.js'
import { Client } from './client'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import { Handler } from './services/handler'
import { Fetcher } from './services/fetcher'
import { Commands } from './commands/commands'
import fs from 'fs'

@injectable()
export class Bot {
  private client: Client
  private readonly token: string
  private handler: Handler
  private fetcher: Fetcher
  private commands: Commands

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.Handler) handler: Handler,
    @inject(TYPES.Fetcher) fetcher: Fetcher,
    @inject(TYPES.Commands) commands: Commands,
  ) {
    this.client = client
    this.token = token
    this.handler = handler
    this.fetcher = fetcher
    this.commands = commands
  }

  public async listen(): Promise<string> {
    const BOT_TOKEN = process.env.BOT_TOKEN
    const GUILD_ID = process.env.GUILD_ID
    await this.fetcher.initialize()

    const commandFiles = fs
      .readdirSync('./src/commands/public')
      .filter((file) => file.endsWith('.ts'))
    console.log('commandFiles: ', commandFiles)

    const botCommands = []
    this.client.commands = new Collection()

    for (const file of commandFiles) {
      const command = await import(`./commands/public/${file}`)
      const commandData = Object.values(command)[0]['data'].toJSON()
      console.log('commandData: ', commandData)
      botCommands.push(commandData)
      this.client.commands.set(commandData.name, command)
    }

    this.client.once('ready', () => {
      console.log('Ready!')
      const REST_VER = { version: '9' }
      const COMMANDS = { body: botCommands }
      const CLIENT_ID = this.client.user.id
      const rest = new REST(REST_VER).setToken(BOT_TOKEN)

      ;(async () => {
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
      })()
    })

    this.client.on('messageCreate', (message: Message) => {
      this.handler
        .handle(message)
        .then(() => {
          console.log('Response sent!')
        })
        .catch(() => {
          console.log('Response not sent!')
        })
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
    return this.client.login(this.token)
  }
}
