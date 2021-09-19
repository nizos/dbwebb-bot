import { Client as DiscordClient, Collection, Intents } from 'discord.js'

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
