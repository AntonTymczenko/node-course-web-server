const {mongoose} = require('../server/db/mongoose')
const {Todo} = require('../server/models/todo')
const {User} = require('../server/models/user')

const {ObjectID} = require('mongodb')


// Todo.remove({})

// Todo.findOneAndRemove

// Todo.findByIdAndRemove


Todo.findOneAndRemove({_id: '...'})
  .then ((todo) => {
    
  })
