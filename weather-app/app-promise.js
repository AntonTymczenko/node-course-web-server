const yargs = require('yargs'),
      axios = require('axios')

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

const locationApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const geoUrl = locationApiUrl + encodeURIComponent(argv.address)

console.log('getting location for:', argv.address)
axios.get(geoUrl)
  .then((res) => {
    if (res.data.status === 'ZERO_RESULTS'){
       throw new Error('Unable to find that address')
    }
    const lat = res.data.results[0].geometry.location.lat
    const lng = res.data.results[0].geometry.location.lng
    const weatherApiUrl = 'https://api.darksky.net/forecast/184dd35e027ab591a8ba26fd27bdbc5e/'
    const weatherUrl = weatherApiUrl + lat + ',' + lng + '?units=si'
    console.log('Formatted address:', res.data.results[0].formatted_address)
    console.log('getting weather for this adress...')
    return axios.get(weatherUrl)
  })
  .then((res) => {
    const temp = res.data.currently.temperature,
      apparent = res.data.currently.apparentTemperature
    console.log(`It's currently ${Math.round(temp)}°C. And it feels like ${Math.round(apparent)}°C.`)
  })
  .catch((err) => {
    if (err.code === 'ENOTFOUND') {
      console.log('Unable to connect to API server')
    } else {
      console.log(err.message)
    }
  })
