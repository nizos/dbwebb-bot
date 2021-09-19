import { Message } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export interface Command {
  data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
  execute: (interaction: Message) => Promise<void>
}
