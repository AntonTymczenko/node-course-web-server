const mongoose = require('mongoose'),
  validator = require('validator'),
  jwt = require('jsonwebtoken'),
  _ = require('lodash')

const UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()

  return _.pick(userObject, ['email', '_id', 'name'])
}

UserSchema.methods.generateAuthToken = function () {
  let user = this
  const access = 'auth'
  let token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'abc123').toString()

  user.tokens.push({access, token})
  return user.save().then(() => token)
}

const User = mongoose.model('User', UserSchema)

module.exports = {User}
