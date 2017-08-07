console.log('starting app.js')

require('dotenv').config()
const fs    = require('fs'),
      // _     = require('lodash'),
      yargs = require('yargs')

const notes = require('./notes')

const command = process.argv[2]
const argv = yargs.argv


if (command === 'add') {
  let note = notes.add(argv.title, argv.body)
  if (note) {
    console.log('Note created')
    console.log('----')
    console.log(`Title: ${note.title}`)
    console.log(`Body: ${note.body}`)
  } else {
    console.log(`Note title "${argv.title}" taken`)
  }
} else if (command === 'list') {
  notes.list()
} else if (command === 'read') {
  notes.read(argv.title)
} else if (command === 'remove') {
  notes.remove(argv.title)
} else {
  console.log('Command not recognized')
}
