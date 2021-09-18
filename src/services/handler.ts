import { Message } from 'discord.js'
import { Responder } from './responder'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'

@injectable()
export class Handler {
  private prefix = process.env.BOT_PREFIX
  private responder: Responder

  constructor(@inject(TYPES.Responder) responder: Responder) {
    this.responder = responder
  }

  public proceed(message: Message): boolean {
    return message.content.startsWith(this.prefix) && !message.author.bot
  }

  async handle(message: Message): Promise<Message | Message[]> {
    if (this.proceed(message)) {
      await this.responder.handle(message)
    } else {
      return Promise.reject()
    }
  }
}
