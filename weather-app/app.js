const yargs = require('yargs'),
  geocode = require('./geocode/geocode'),
  weather = require('./weather/weather')


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
    console.log(res.address)
    weather.getWeather(res.latitude, res.longitude, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`It's currently ${res.temperature} °C. And it feels like ${res.apparent}.`)
      }
    })
  }
})
