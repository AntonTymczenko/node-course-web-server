const request = require('request')

const weatherApiUrl = 'https://api.darksky.net/forecast/184dd35e027ab591a8ba26fd27bdbc5e/'

const getWeather = (lat, lng, callback) => {
  let weatherUrl = weatherApiUrl + lat + ',' + lng
  weatherUrl += '?units=si'
  request({
    url: weatherUrl,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparent: body.currently.apparentTemperature
      })
    } else {
      callback('Unable to get weather')
    }
  })
}

module.exports = {getWeather}
