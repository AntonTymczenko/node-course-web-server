const yargs = require('yargs'),
  geocode = require('./geocode/geocode')

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
      console.log(JSON.stringify(res, undefined, 2))
    }
  })
