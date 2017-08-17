const mongoose = require('mongoose')

require('dotenv').config()
const {MONGODB_URI} = process.env

mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI,  {useMongoClient: true})

module.exports = {
  mongoose
}
