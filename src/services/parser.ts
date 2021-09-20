// need to generate data for this to exist maybe?
import authors from '../data/authors/authors.json'
import { promises as fs } from 'fs'

export class Parser {
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
      return fs.readdir('./data/website/content/' + name, {
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

  async getCourses() {
    try {
      const coursesDir = await this.getDirectory('kurser')
      return coursesDir.filter((d) => d.isDirectory).map((d) => d.name)
    } catch (error) {
      console.error(`Error encountered while getting courses. Error: ${error}.`)
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

  async getCourse(name: string) {
    try {
      const courseName = await this.findCourse(name)
      const coursePath =
        './data/website/content/kurser/' + courseName + '/index.md'
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

  // methods?
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
}
