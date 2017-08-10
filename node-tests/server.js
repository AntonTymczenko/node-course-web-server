const utils = require('./utils/utils'),
     express = require('express')

const app = express()

app.get('/', () => {
  res.send('home page')
})

app.listen(3000)
