const utils = require('./utils/utils'),
     express = require('express')

const app = express()

app.get('/', (req, res) => {
  // res.status(404).send('home page')
  res.status(404).send({
    error: 'Page not found.',
    name: 'Todo App v.1.0'
  })
})

app.get('/users', (req, res) => {
  res.status(200).send([
  {
    name: 'Domingo',
    age: 29
  },
  {
    name: 'Bob',
    age: 20
  },
  {
    name: 'Alice',
    age: 18
  }
  ])
})

app.listen(8080)
module.exports.app = app
