import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git'
import { inject, injectable } from 'inversify'

@injectable()
export class Fetcher {
  private git: SimpleGit
  private repoPath: string
  private options: Partial<SimpleGitOptions>
  private command: string

  constructor() {
    this.repoPath = process.env.REPO_URL
    this.options = {
      baseDir: './data/',
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
        .catch((err) => {
          console.log(
            `Could not update local dbwebb data from remote repository: ${this.repoPath}. Error: ${err}`,
          )
        })
    } catch (err) {
      console.log(
        `Error encountered while attempting to update local dbwebb data from remote repository ${this.repoPath}. Error: ${err}.`,
      )
    }
  }

  async initialize() {
    try {
      await this.git
        .status()
        .then(async () => {
          await this.git.clone(this.repoPath)
          console.log(`Successfully cloned remote repository ${this.repoPath}.`)
          // await this.update();
        })
        .catch((err) => {
          console.log(
            `Could not clone remote repository ${this.repoPath}. Error: ${err}`,
          )
        })
    } catch (err) {
      console.log(
        `Error encountered while attempting to clone remote repository ${this.repoPath}. Error: ${err}.`,
      )
    }
  }
}
