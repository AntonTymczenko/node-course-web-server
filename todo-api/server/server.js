// dependencies:
const express = require('express'),
  bodyParser = require('body-parser'),
  {ObjectID} = require('mongodb'),
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

//index
app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send({
        todos,
        code: 'custom status code'
      })
    })
    .catch((err) => {
      res.status(400).send('Error')
      console.log(err)
    })
})

//show
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Bad request')
  }
  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send('Not found')
      }
      res.status(200).send({todo})
    })
    .catch((err) => {
      res.status(500).send('Error')
      console.log(err)
    })
})

//create
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
