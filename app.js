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
    notes.printNote(note)
  } else {
    console.log(`Note title "${argv.title}" taken`)
  }
} else if (command === 'list') {
  notes.list()
} else if (command === 'read') {
  let note = notes.read(argv.title)
  if (note) {
    console.log('Note found:')
    notes.printNote(note)
  } else {
    console.log(`Note "${argv.title}" not found`)
  }
} else if (command === 'remove') {
  let noteRemoved = notes.remove(argv.title)
  const message = noteRemoved ? `${argv.title} was removed` : 'No such title'
  console.log(message)
} else {
  console.log('Command not recognized')
}
