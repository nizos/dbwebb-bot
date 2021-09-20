import { Client as DiscordClient, Intents, Collection } from 'discord.js'

export class Client extends DiscordClient {
  // maybe put this in the DI container?
  public commands: Collection<unknown, any>

  constructor() {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
      ],
    })
    this.commands = new Collection()
  }
}
