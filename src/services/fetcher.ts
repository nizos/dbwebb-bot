import { singleton } from '@aurelia/kernel'
import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git'
import { Config } from '../config'

@singleton
export class Fetcher {
  private git: SimpleGit
  private repoUrl: string
  private options: Partial<SimpleGitOptions>
  private command: string

  constructor(config: Config) {
    this.repoUrl = config.repoUrl
    this.options = {
      baseDir: './src/data/git/',
      binary: 'git',
      maxConcurrentProcesses: 6,
    }
    this.command =
      'ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no'
    this.git = simpleGit(this.options)
    this.git.env('GIT_SSH_COMMAND', this.command)
  }

  async update() {
    try {
      await this.git
        .status()
        .then(async () => {
          await this.git.fetch()
          await this.git.pull('origin', 'master', { '--no-rebase': null })
          console.log('Successfully updated local dbwebb data.')
        })
        .catch((error) => {
          console.error(
            `Could not update local dbwebb data from remote repository: ${this.repoUrl}. Error: ${error}`,
          )
        })
    } catch (error) {
      console.error(
        `Error encountered while attempting to update local dbwebb data from remote repository ${this.repoUrl}. Error: ${error}.`,
      )
    }
  }

  async initialize() {
    try {
      await this.git
        .status()
        .then(async () => {
          await this.git.clone(this.repoUrl)
          console.log(`Successfully cloned remote repository ${this.repoUrl}.`)
        })
        .catch((error) => {
          console.error(
            `Could not clone remote repository ${this.repoUrl}. Error: ${error}`,
          )
        })
    } catch (error) {
      console.error(
        `Error encountered while attempting to clone remote repository ${this.repoUrl}. Error: ${error}.`,
      )
    }
  }
}
