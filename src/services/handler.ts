import { singleton } from '@aurelia/kernel'
import { Message } from 'discord.js'
import { Config } from '../config'
import { Responder } from './responder'

@singleton
export class Handler {
  constructor(
    private readonly config: Config,
    private readonly responder: Responder,
  ) {}

  public proceed(message: Message): boolean {
    return (
      message.content.startsWith(this.config.botPrefix) && !message.author.bot
    )
  }

  async handle(message: Message): Promise<Message | Message[]> {
    if (this.proceed(message)) {
      await this.responder.handle(message)
    } else {
      return Promise.reject()
    }
  }
}
