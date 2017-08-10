const express = require('express'),
      hbs     = require('hbs'),
      fs      = require('fs')

require('dotenv').config()

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
// app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

// adding custom middleware:
app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('./server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log')
    }
  })
  next()
})
//maintenance mode:
/*
app.use((req, res, next) => {
  res.render('maintenance')
})
*/

// static files directory:
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello my dear friend and welcome to my web site! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error. Can\'t get that page'
  })
})


app.listen(process.env.PORT, () => {
  console.log('Starting on port', process.env.PORT)
})
