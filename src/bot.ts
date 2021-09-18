import { Client, Message } from 'discord.js'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import { Handler } from './services/handler'
import { Fetcher } from './services/fetcher'

@injectable()
export class Bot {
  private client: Client
  private readonly token: string
  private handler: Handler
  private fetcher: Fetcher

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.Handler) handler: Handler,
    @inject(TYPES.Fetcher) fetcher: Fetcher,
  ) {
    this.client = client
    this.token = token
    this.handler = handler
    this.fetcher = fetcher
  }

  public async listen(): Promise<string> {
    await this.fetcher.initialize()
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
    return this.client.login(this.token)
  }
}
