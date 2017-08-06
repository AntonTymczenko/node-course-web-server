console.log('starting app.js')

const fs = require('fs')
const os = require('os')
const _ = require('lodash')
const notes = require('./notes')

// console.log(_.isString(true))
// console.log(_.isString('BOb5'))
let filteredArray = _.uniq(['Bob', 1, 'Bob', 1, 2, 3, 4])
console.log(filteredArray)

// console.log(notes.add('hello ', 'world'))
// console.log(notes.add(5, -3))

// let user = os.userInfo()

// fs.appendFileSync('greetings.txt', `Hello ${user.username}! You are ${notes.age}.\n`)
