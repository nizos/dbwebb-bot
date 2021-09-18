import { injectable } from 'inversify'
import authors from '../data/authors/authors.json'
import fs from 'fs'

@injectable()
export class Parser {
  public fsPromises = fs.promises

  public sortResults(results) {
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

  async getDirectory(name) {
    try {
      return this.fsPromises.readdir('./data/website/content/' + name, {
        withFileTypes: true,
      })
    } catch (err) {
      console.log(
        `Error encountered while getting directory ${name}. Error: ${err}.`,
      )
    }
  }

  async getFile(path) {
    try {
      return this.fsPromises.readFile(path)
    } catch (err) {
      console.log(
        `Error encountered while getting file ${path}. Error: ${err}.`,
      )
    }
  }

  async getCourses() {
    try {
      let courses = []
      const coursesDir = await this.getDirectory('kurser')
      for (const entry of coursesDir) {
        if (entry.isDirectory) {
          courses.push(entry.name)
        }
      }
      return courses
    } catch (err) {
      console.log(`Error encountered while getting courses. Error: ${err}.`)
    }
  }

  async findCourse(name: string) {
    try {
      // Get matching courses by name
      const courses = await this.getCourses()
      let matches = []
      for (const course of courses) {
        if (course.includes(name)) {
          matches.push(course)
        }
      }
      // Sort results
      matches = this.sortResults(matches)

      // Process best match
      console.log('Total results: ', matches.length)
      console.log('Best result: ', matches[0])
      return matches[0]
    } catch (err) {
      console.log(
        `Error encountered while getting course ${name}. Error: ${err}.`,
      )
    }
  }

  async getCourse(name: string) {
    try {
      const courseName = await this.findCourse(name)
      const coursePath =
        './data/website/content/kurser/' + courseName + '/index.md'
      const courseFile = await this.getFile(coursePath)
      const courseData = courseFile.toString()
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
    } catch (err) {
      console.log(
        `Error encountered while getting course ${name}. Error: ${err}.`,
      )
    }
  }

  public getDescription = (text) => {
    const noMetaData = text.substring(text.indexOf('...\n'))
    const noTitle = noMetaData.substring(noMetaData.indexOf('\n\n') + 2)
    const description = noTitle.substring(0, noTitle.indexOf('\n\n'))
    return description
  }

  public getAuthorAcr = (text) => {
    console.log('getAuthorAcr called')
    const authors = text.substring(text.indexOf('author:\n') + 8)
    const author = authors.substring(
      authors.indexOf('- ') + 2,
      authors.indexOf('\n'),
    )
    return author
  }

  public getAuthor = (acr) => {
    console.log('getAuthorAcr called')
    console.log(`getAuthor(${acr})`)
    console.log(`Authors: ${authors}`)
    return authors[acr]
  }

  public getTitle = (text) => {
    console.log('getAuthorAcr called')
    const noMetaData = text.substring(text.indexOf('...\n') + 4)
    const title = noMetaData.substring(0, noMetaData.indexOf('\n'))
    return title
  }

  public getDate = (text) => {
    console.log('getAuthorAcr called')
    const revisions = text.substring(text.indexOf('revision:\n'))
    const date = revisions.substring(
      revisions.indexOf('"') + 1,
      revisions.indexOf('":'),
    )
    return date
  }
}
