const mongoose = require('mongoose'),
  validator = require('validator')

const User = mongoose.model('User', {
  email: {
    required: true,
    type: String,
    unique: true,
    minLength: 1,
    trim: true,
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  name: {
    type: String
  }
})

module.exports = {User}
