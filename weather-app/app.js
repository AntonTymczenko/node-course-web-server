const request = require('request')

const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia'

request({
  url,
  json: true
}, (error, response, body) => {
  console.log('latitude: ', body.results[0].formatted_address)
  console.log('latitude: ', body.results[0].geometry.location.lat)
  console.log('longitude: ', body.results[0].geometry.location.lng)
})
