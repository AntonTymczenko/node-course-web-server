const mongoose = require('mongoose');
const User = mongoose.model('User', {
  email: {
    required: true,
    type: String,
    minLength: 1,
    trim: true
  },
  name: {
    type: String
  }
})

module.exports = {User}
