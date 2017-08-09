const express = require('express')

const app = express()
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  // res.send('<h1>Hello from express.js</h1>')
  // /*
  res.send({
    name: 'Robert Paulson',
    likes: [
      'hiking',
      'cooking'
    ]
  })
  // */
})
app.get('/about', (req, res) => {
  res.send('<h1>About page</h1>')
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error. Can\'t get that page'
  })
})

app.listen(8080, () => {
  console.log('Starting on port 8080')
})
