console.log('starting notes.js')

const add = (title, body) => {
  console.log('Adding new note', title, body)
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
