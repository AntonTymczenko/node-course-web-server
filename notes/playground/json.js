// let obj = {
//   name: 'Domingo'
// }
// let strObj = JSON.stringify(obj)
// console.log(typeof strObj)
// console.log('strObj:', strObj)

// let personString = '{"name": "Domingo", "age": 25}'
// let person = JSON.parse(personString)
// console.log(typeof person)
// console.log(person)

const fs = require('fs')

let originalNote = {
  title: 'Some title',
  body: 'some lorem ipsum dolorem sicut'
}

fs.writeFileSync('./notes.json', JSON.stringify(originalNote))

let noteString = fs.readFileSync('./notes.json')
const note = JSON.parse(noteString)
console.log('Title:', note.title)
console.log('Body:', note.body)
