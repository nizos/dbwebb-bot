require('dotenv').config()
import { container } from './aurelia-di'
import { Bot } from './bot'

container
  .get(Bot)
  .listen()
  .then(() => {
    console.log('Logged in!')
  })
  .catch((error) => {
    console.log('Error: ', error)
  })
