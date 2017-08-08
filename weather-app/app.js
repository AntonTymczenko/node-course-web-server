const yargs = require('yargs'),
  geocode = require('./geocode/geocode')

const request = require('request')
const weatherApiUrl = 'https://api.darksky.net/forecast/184dd35e027ab591a8ba26fd27bdbc5e/'

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

  geocode.geocodeAddress(argv.address, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      // console.log(JSON.stringify(res, undefined, 2))
      const weatherUrl = weatherApiUrl + res.latitude + ',' + res.longitude
      request({
        url: weatherUrl,
        json: true
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          console.log(JSON.stringify(body.currently.temperature, undefined, 2))
        } else {
          console.log('Unable to get weather')
          console.log(error)
        }
      })
    }
  })
