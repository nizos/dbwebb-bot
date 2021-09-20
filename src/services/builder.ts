import fs from 'fs'

export class Builder {
  getCourseOptions() {
    try {
      // Can't automate since total courses exceed 25 options limit
      // const coursesDir = fs.readdirSync('./data/website/content/kurser', {
      //   withFileTypes: true,
      // })
      // coursesDir.filter((d) => d.isDirectory).map((d) => d.name)
      // const courseOptions: [name: string, value: string][] = []
      // for (const course in coursesDir) {
      //   courseOptions.push([course, course])
      // }
      // return courseOptions
      const options: [name: string, value: string][] = [
        ['databas', 'databas'],
        ['design', 'design'],
        ['devops', 'devops'],
        ['exjobb', 'exjobb'],
        ['exjobb-kandidat', 'exjobb-kandidat'],
        ['grupproj', 'grupproj'],
        ['htmlphp', 'htmlphp'],
        ['indproj', 'indproj'],
        ['itsec', 'itsec'],
        ['js', 'js'],
        ['jsramverk', 'jsramverk'],
        ['linux', 'linux'],
        ['matmod', 'matmod'],
        ['mvc', 'mvc'],
        ['oopython', 'oopython'],
        ['python', 'python'],
        ['ramverk1', 'ramverk1'],
        ['stortproj', 'stortproj'],
        ['sysver', 'sysver'],
        ['telecom', 'telecom'],
        ['unix', 'unix'],
        ['vlinux', 'vlinux'],
        ['webapp', 'webapp'],
        ['webtec', 'webtec'],
        ['Sök kurs', 'search'],
      ]
      return options
    } catch (error) {
      console.error(
        `Error encountered while getting course options. Error: ${error}.`,
      )
    }
  }

  getSearchOptions() {
    try {
      // Can't automate since total courses exceed 25 options limit
      // const coursesDir = fs.readdirSync('./data/website/content/kurser', {
      //   withFileTypes: true,
      // })
      // coursesDir.filter((d) => d.isDirectory).map((d) => d.name)
      // const courseOptions: [name: string, value: string][] = []
      // for (const course in coursesDir) {
      //   courseOptions.push([course, course])
      // }
      // return courseOptions
      const options: [name: string, value: string][] = [
        ['databas', 'databas'],
        ['design', 'design'],
        ['devops', 'devops'],
        ['exjobb', 'exjobb'],
        ['exjobb-kandidat', 'exjobb-kandidat'],
        ['grupproj', 'grupproj'],
        ['htmlphp', 'htmlphp'],
        ['indproj', 'indproj'],
        ['itsec', 'itsec'],
        ['js', 'js'],
        ['jsramverk', 'jsramverk'],
        ['linux', 'linux'],
        ['matmod', 'matmod'],
        ['mvc', 'mvc'],
        ['oopython', 'oopython'],
        ['python', 'python'],
        ['ramverk1', 'ramverk1'],
        ['stortproj', 'stortproj'],
        ['sysver', 'sysver'],
        ['telecom', 'telecom'],
        ['unix', 'unix'],
        ['vlinux', 'vlinux'],
        ['webapp', 'webapp'],
        ['webtec', 'webtec'],
        ['Sök kurs', 'search'],
      ]
      return options
    } catch (error) {
      console.error(
        `Error encountered while getting course options. Error: ${error}.`,
      )
    }
  }
}
