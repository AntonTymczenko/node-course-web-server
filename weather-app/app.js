const request = require('request'),
      yargs   = require('yargs')

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to get weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const url = apiUrl + encodeURIComponent(argv.a)

request({
  url,
  json: true
}, (error, response, body) => {
  if (error) {
    console.log('Unable to connect to Google location API')
  } else if (body.status === 'ZERO_RESULTS'){
    console.log('Unable to find that address')
  } else if (body.status === 'OK') {
    console.log('formatted_address: ', body.results[0].formatted_address)
    console.log('latitude: ', body.results[0].geometry.location.lat)
    console.log('longitude: ', body.results[0].geometry.location.lng)
  }
})
