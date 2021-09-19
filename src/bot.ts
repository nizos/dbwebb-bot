import { singleton } from '@aurelia/kernel'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Collection, Message } from 'discord.js'
import fs from 'fs'
import { Client } from './client'
import { Commands } from './commands/commands'
import { Config } from './config'
import { Fetcher } from './services/fetcher'
import { Handler } from './services/handler'

@singleton
export class Bot {
  constructor(
    private readonly client: Client,
    private readonly config: Config,
    private readonly handler: Handler,
    private readonly fetcher: Fetcher,
    private readonly commands: Commands,
  ) {}

  public async listen(): Promise<string> {
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
      const rest = new REST(REST_VER).setToken(this.config.token)

      ;(async () => {
        try {
          if (!this.config.guildId) {
            await rest.put(Routes.applicationCommands(CLIENT_ID), COMMANDS)
            console.log('Successfully registered application commands.')
          } else {
            await rest.put(
              Routes.applicationGuildCommands(CLIENT_ID, this.config.guildId),
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
    return this.client.login(this.config.token)
  }
}
