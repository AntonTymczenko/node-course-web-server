const express = require('express'),
      hbs     = require('hbs')

const app = express()
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello my dear friend and welcome to my web site! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    currentYear: new Date().getFullYear()
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error. Can\'t get that page'
  })
})

app.listen(8080, () => {
  console.log('Starting on port 8080')
})
