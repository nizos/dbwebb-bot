import { Client as DiscordClient, Intents, Collection } from 'discord.js'
import { injectable } from 'inversify'

@injectable()
export class Client extends DiscordClient {
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
