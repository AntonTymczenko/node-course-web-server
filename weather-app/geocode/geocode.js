const request = require('request')

const geocodeAddress = (inputAddress, callback) => {
  const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  const url = apiUrl + encodeURIComponent(inputAddress)
  request({
    url,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google location API')
    } else if (body.status === 'ZERO_RESULTS'){
      callback('Unable to find that address')
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  })
}

module.exports = {geocodeAddress}
