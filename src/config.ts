export class Config {
  public token = process.env.BOT_TOKEN
  public guildId = process.env.GUILD_ID
  public repoUrl = process.env.REPO_URL ?? 'http://github.com/dbwebb-se/website'
  public botPrefix = process.env.BOT_PREFIX ?? '/'
}
