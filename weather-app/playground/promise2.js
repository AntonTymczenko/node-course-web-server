const request = require('request')

let geocodeAddress = (inputAddress) => {
  const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  const url = apiUrl + encodeURIComponent(inputAddress)
  return new Promise((resolve, reject) => {
    request({
      url,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google location API')
      } else if (body.status === 'ZERO_RESULTS'){
        reject('Unable to find that address')
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      }
    })
  })
}


geocodeAddress('08151')
  .then((location) => {
    console.log(JSON.stringify(location, undefined, 2))
  })
  .catch((err) => {
    console.log(err)
  })
  
module.exports = {geocodeAddress}
