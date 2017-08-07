console.log('starting app.js')

require('dotenv').config()
const fs    = require('fs'),
      _     = require('lodash'),
      yargs = require('yargs')

const notes = require('./notes')

const command = process.argv[2]
const argv = yargs.argv
console.log('Command:', command)
// console.log('Process',process.argv)
// console.log('Yargs:',argv)


if (command === 'add') {
  notes.add(argv.title, argv.body)
} else if (command === 'list') {
  notes.list()
} else if (command === 'read') {
  notes.read(argv.title)
} else if (command === 'remove') {
  notes.remove(argv.title)
} else {
  console.log('Command not recognized')
}
