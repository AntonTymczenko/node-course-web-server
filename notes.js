console.log('starting notes.js')

const fs = require('fs')

const fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('./notes-data.json')
    return JSON.parse(notesString)
  } catch (e) {
    return [] // no such file
  }
}

const saveNotes = (notes) => {
  fs.writeFileSync('./notes-data.json', JSON.stringify(notes) + '\n')
}

// CRUD ----------------------------------------------------------------------
const add = (title, body) => {
  let notes = fetchNotes()
  let duplicateNotes = notes.filter((note) => note.title === title )
  if (duplicateNotes.length === 0 ) {
    let note = {title, body}
    notes.push(note)
    saveNotes(notes)
    return note
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
