const fs = require('fs')

const fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('./notes-data.json')
    return JSON.parse(notesString)
  } catch (e) {
    return [] // no such file
  }
}

const saveNotes = notes => {
  fs.writeFileSync('./notes-data.json', JSON.stringify(notes) + '\n')
}


// CRUD ----------------------------------------------------------------------
const add = (title, body) => {
  let notes = fetchNotes()
  let duplicateNotes = notes.filter(note => note.title === title )
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

const read = title => {
  let notes = fetchNotes()
  return notes.filter(note => note.title === title)[0]
}

const remove = title => {
  let notes = fetchNotes()
  let filtered = notes.filter(note => note.title !== title)
  saveNotes(filtered)
  return notes.length !== filtered.length
}
// OUTPUTS ----------------------------------------------------------------
const printNote = note => {
  // Break on this line and use REPL to output note
  debugger;
  console.log('-------------------')
  console.log(`Title: ${note.title}`)
  console.log(`Body: ${note.body}`)
}
module.exports = {
  add,
  list,
  read,
  remove,
  printNote
}
