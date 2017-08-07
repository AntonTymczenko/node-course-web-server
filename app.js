require('dotenv').config()
const fs    = require('fs'),
      yargs = require('yargs')

const notes = require('./notes')

const flags = {
    title: {
      describe: 'Title of note',
      demand: true,
      alias: 't'
    },
    body: {
      describe: 'Note\'s body',
      demand: true,
      alias: 'b'
    }
}
const argv = yargs
  .command('add', 'Add a new note', flags)
  .command('list', 'List all of the notes')
  .command('read', 'Read a note', {title: flags.title})
  .command('remove',  'Remove a note', {title: flags.title})
  .help()
  .argv
const command = argv._[0]


if (command === 'add') {
  let note = notes.add(argv.title, argv.body)
  if (note) {
    console.log('Note created')
    notes.printNote(note)
  } else {
    console.log(`Note title "${argv.title}" taken`)
  }
} else if (command === 'list') {
  let noteList = notes.list()
  console.log(`List of ${noteList.length} note(s):`)
  noteList.forEach( note => notes.printNote(note) )
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
