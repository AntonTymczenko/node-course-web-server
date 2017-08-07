console.log('starting notes.js')

const fs    = require('fs')

const add = (title, body) => {
  console.log('Adding new note', title, body)
  let notes = []
  try {
    let notesString = fs.readFileSync('./notes-data.json')
    notes = JSON.parse(notesString)
  } catch (e) {
    console.log('no file')
  }
  let duplicateNotes = notes.filter((note) => note.title === title )
  if (duplicateNotes.length === 0 ) {
    let note = {title, body}
    notes.push(note)
    fs.writeFileSync('./notes-data.json', JSON.stringify(notes) + '\n')
  } else {
    console.log('already title', title)
  }
}

const list = () =>{
  console.log('Listing all notes')
}

const read = (title) => {
  console.log('Fetching note', title)
}

const remove = (title) => {
  console.log('Removing note', title)
}
module.exports = {
  add,
  list,
  read,
  remove
}
