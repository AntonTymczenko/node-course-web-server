const request = require('request')

const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia'

request({
  url,
  json: true
}, (error, response, body) => {
  console.log('latitude: ', JSON.stringify(body.results[0].geometry.location.lat, undefined, 2))
  console.log('longitude: ', JSON.stringify(body.results[0].geometry.location.lng, undefined, 2))
})
