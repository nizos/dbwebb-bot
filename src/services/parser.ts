// need to generate data for this to exist maybe?
import authors from '../data/static/authors.json'
import { promises as fs } from 'fs'

export class Parser {
  async getCourse(name: string) {
    try {
      const courseName = await this.findCourse(name)
      const coursePath =
        './src/data/git/website/content/kurser/' + courseName + '/index.md'
      const courseData = (await this.getFile(coursePath)).toString()

      // Details
      const meta = courseData.substring(
        courseData.indexOf('---\n') + 4,
        courseData.indexOf('...\n'),
      )
      const body = courseData.substring(courseData.indexOf('...\n') + 4)
      const sections = body.split('\n\n\n\n')

      // Acronym
      const acrStart = meta.substring(meta.indexOf('author:\n') + 8)
      const acronym = acrStart.substring(
        acrStart.indexOf('- ') + 2,
        acrStart.indexOf('\n'),
      )

      // Author
      const author = authors[acronym]
      // Date
      const dateStart = meta.substring(
        meta.indexOf('"', meta.indexOf('revision:\n') + 10) + 1,
      )
      const date = dateStart.substring(0, dateStart.indexOf('":'))

      // Title
      const title = body.substring(0, body.indexOf('\n'))
      // Description
      const descStart = body.substring(
        body.indexOf('\n\n', body.indexOf('...\n') + 4) + 2,
      )
      const description = descStart.substring(0, descStart.indexOf('\n'))

      // URL
      const url = 'https://dbwebb.se/kurser/' + courseName

      /**
       *
       * const headings = sections.reduce((acc, cur) => {
       *   // modify acc
       *   return acc
       * }, '')
       *
       */

      // headings
      let headings = ''
      for (let i = 0; i < sections.length; i++) {
        const heading = sections[i].substring(0, sections[i].indexOf('\n'))
        const anchor = heading.substring(
          heading.indexOf('{') + 2,
          heading.indexOf('}'),
        )
        if (!heading.startsWith('###')) {
          const name = heading.substring(0, heading.indexOf('{') - 1)
          if (name != '') {
            headings += `[${name}](${url + '#' + anchor})\n`
          }
        }
      }

      // Return data
      return {
        acronym: acronym,
        author: author,
        title: title,
        date: date,
        description: description,
        headings: headings,
        name: courseName,
        url: url,
      }
    } catch (error) {
      console.error(
        `Error encountered while getting course ${name}. Error: ${error}.`,
      )
    }
  }

  async findKnowledgeArticle(name: string) {
    try {
      const articles = await this.getKnowledgeArticles()
      const matches = articles.filter((article) => article.includes(name))
      const sortedMatches = this.sortResults(matches)

      // Best result
      const resultURL = sortedMatches[0]
      const resultName = this.sanitizeName(resultURL)
      const resultPath = './src/data/git/website/content/kunskap/' + resultURL
      const resultData = (await this.getFile(resultPath)).toString()

      // Details
      const meta = resultData.substring(
        resultData.indexOf('---\n') + 4,
        resultData.indexOf('...\n'),
      )
      const body = resultData.substring(resultData.indexOf('...\n') + 4)
      const sections = body.split('\n\n\n\n')

      // Acronym
      const acrStart = meta.substring(meta.indexOf('author:\n') + 8)
      const acronym = acrStart.substring(
        acrStart.indexOf('- ') + 2,
        acrStart.indexOf('\n'),
      )

      // Author
      const author = authors[acronym]
      // Date
      const dateStart = meta.substring(
        meta.indexOf('"', meta.indexOf('revision:\n') + 10) + 1,
      )
      const date = dateStart.substring(0, dateStart.indexOf('":'))

      // Title
      const title = body.substring(0, body.indexOf('\n'))
      // Description
      const descStart = body.substring(
        body.indexOf('\n\n', body.indexOf('...\n') + 4) + 2,
      )
      const description = descStart.substring(0, descStart.indexOf('\n'))

      // URL
      const url = 'https://dbwebb.se/kunskap/' + resultName

      /**
       *
       * const headings = sections.reduce((acc, cur) => {
       *   // modify acc
       *   return acc
       * }, '')
       *
       */

      // headings
      let headings = ''
      let totalHeadings = 0
      for (let i = 0; i < sections.length; i++) {
        if (totalHeadings < 20) {
          const heading = sections[i].substring(0, sections[i].indexOf('\n'))
          const anchor = heading.substring(
            heading.indexOf('{') + 2,
            heading.indexOf('}'),
          )
          if (!heading.startsWith('###')) {
            const name = heading.substring(0, heading.indexOf('{') - 1)
            if (name != '') {
              headings += `[${name}](${url + '#' + anchor})\n`
              totalHeadings++
            }
          }
        } else {
          headings += `[...](${url})\n`
          totalHeadings++
        }
      }

      // Related results
      let related = ''
      for (let i = 1; i < sortedMatches.length - 1; i++) {
        if (totalHeadings + i >= 25) {
          break
        } else {
          const resultFile = sortedMatches[i]
          const resultName = this.sanitizeName(resultFile)
          const resultURL = 'https://dbwebb.se/kunskap/' + resultName
          const resultPath =
            './src/data/git/website/content/kunskap/' + resultFile
          const resultData = (await this.getFile(resultPath)).toString()
          const body = resultData.substring(resultData.indexOf('...\n') + 4)
          const title = body.substring(0, body.indexOf('\n'))
          related += `[${title}](${resultURL})\n`
        }
      }

      // Return data
      return {
        acronym: acronym,
        author: author,
        title: title,
        date: date,
        description: description,
        headings: headings,
        name: resultName,
        url: url,
        related: related,
      }
    } catch (error) {
      console.error(
        `Error encountered while getting knowledge articles: ${name}. Error: ${error}.`,
      )
    }
  }

  async findCourse(name: string) {
    try {
      // Get matching courses by name
      const courses = await this.getCourses()
      const matches = courses.filter((c) => c.includes(name))

      // Sort results
      const sortedMatches = this.sortResults(matches)

      // Process best match
      console.log('Total results: ', sortedMatches.length)
      console.log('Best result: ', sortedMatches[0])
      return sortedMatches[0]
    } catch (error) {
      console.error(
        `Error encountered while getting course ${name}. Error: ${error}.`,
      )
    }
  }

  async getCourses() {
    try {
      const coursesDir = await this.getDirectory('kurser')
      return coursesDir.filter((d) => d.isDirectory).map((d) => d.name)
    } catch (error) {
      console.error(`Error encountered while getting courses. Error: ${error}.`)
    }
  }

  async getKnowledgeArticles() {
    try {
      const knowledgeDir = await this.getDirectory('kunskap')
      return knowledgeDir
        .filter((f) => f.isFile && f.name.endsWith('.md'))
        .map((f) => f.name)
    } catch (error) {
      console.error(
        `Error encountered while getting knowledge articles. Error: ${error}.`,
      )
    }
  }

  sortResults(results: string[]) {
    results.sort((a, b) => {
      if (a.toUpperCase().length == b.toUpperCase().length) {
        if (a.toUpperCase().length < b.toUpperCase().length) {
          return -1
        } else if (a.toUpperCase().length > b.toUpperCase().length) {
          return 1
        } else {
          return 0
        }
      } else if (a.toUpperCase().length < b.toUpperCase().length) {
        return a.toUpperCase().length - b.toUpperCase().length
      } else {
        return 0
      }
    })
    return results
  }

  async getDirectory(name: string) {
    try {
      return fs.readdir('./src/data/git/website/content/' + name, {
        withFileTypes: true,
      })
    } catch (error) {
      console.error(
        `Error encountered while getting directory ${name}. Error: ${error}.`,
      )
    }
  }

  async getFile(path: string) {
    try {
      return fs.readFile(path)
    } catch (error) {
      console.error(
        `Error encountered while getting file ${path}. Error: ${error}.`,
      )
    }
  }

  // methods?
  getEnvironment = (text: string) => {
    // Format: "Shell: ... Terminal: ... Browser: ... Editor: ... OS: ..."
    const shell = text.substring(
      text.indexOf('Shell: ') + 7,
      text.indexOf('Terminal: '),
    )
    const terminal = text.substring(
      text.indexOf('Terminal: ') + 10,
      text.indexOf('Browser: '),
    )
    const browser = text.substring(
      text.indexOf('Browser: ') + 9,
      text.indexOf('Editor: '),
    )
    const editor = text.substring(
      text.indexOf('Editor: ') + 8,
      text.indexOf('OS: '),
    )
    const os = text.substring(text.indexOf('OS: ') + 4)
    const env = {
      shell: shell,
      terminal: terminal,
      browser: browser,
      editor: editor,
      os: os,
    }
    return env
  }

  getDiscordUser = (text: string) => {
    return text.slice(3, -1)
  }

  getDescription = (text: string) => {
    const noMetaData = text.substring(text.indexOf('...\n'))
    const noTitle = noMetaData.substring(noMetaData.indexOf('\n\n') + 2)
    const description = noTitle.substring(0, noTitle.indexOf('\n\n'))
    return description
  }

  getAuthorAcr = (text: string) => {
    console.log('getAuthorAcr called')
    const authors = text.substring(text.indexOf('author:\n') + 8)
    const author = authors.substring(
      authors.indexOf('- ') + 2,
      authors.indexOf('\n'),
    )
    return author
  }

  getAuthor = (acr: string) => {
    console.log('getAuthorAcr called')
    console.log(`getAuthor(${acr})`)
    console.log(`Authors: ${authors}`)
    return authors[acr]
  }

  getTitle = (text: string) => {
    console.log('getAuthorAcr called')
    const noMetaData = text.substring(text.indexOf('...\n') + 4)
    const title = noMetaData.substring(0, noMetaData.indexOf('\n'))
    return title
  }

  getDate = (text: string) => {
    console.log('getAuthorAcr called')
    const revisions = text.substring(text.indexOf('revision:\n'))
    const date = revisions.substring(
      revisions.indexOf('"') + 1,
      revisions.indexOf('":'),
    )
    return date
  }

  sanitizeName = (name: string) => {
    let sanitized = ''
    const start = name.substring(0, name.indexOf('_'))
    const prefixed = /^\d|_+$/.test(start)
    // Remove starting '1234_' from name
    if (prefixed) {
      sanitized = name.substring(start.length + 1)
    } else {
      sanitized = name
    }
    // Remove file extension
    if (sanitized.endsWith('.md')) {
      sanitized = sanitized.slice(0, -3)
    }
    return sanitized
  }
}
