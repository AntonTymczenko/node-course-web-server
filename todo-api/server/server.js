// dependencies:
const express = require('express'),
  bodyParser = require('body-parser'),
// modules:
  {mongoose} = require('./db/mongoose'),
// Models:
  {Todo} = require('./models/todo'),
  {User} = require('./models/user')

require('dotenv').config()
const {PORT} = process.env

const app = express()


// middleware:
app.use(bodyParser.json())

// ROUTES: -----------------------------------------------
app.get('/', (req, res) => {
  res.send('I\'m ROOT')
})

app.get('/todos', (req, res) => {
  Todo.find()
    .then((docs) => {
      res.send({
        docs,
        code: 'custom status code'
      })
    })
    .catch((err) => {
      res.status(400).send('Error')
      console.log(err)
    })
})

app.post('/todos', (req, res) => {
  const {text} = req.body
  let todo = new Todo({text: req.body.text})
  todo.save()
    .then((doc) => {
      res.status(200).send(doc)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

app.listen(PORT, () => {
  console.log('Started on port', PORT)
})

module.exports = {app}
