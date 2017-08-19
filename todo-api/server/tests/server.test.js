const expect = require('expect')
const request = require('supertest')

const {app} = require('../server')
const {Todo} = require('../models/todo')
const {ObjectID} = require('mongodb')

const {todos, populateTodos, users, populateUsers} = require('./seed')


beforeEach(populateUsers)
beforeEach(populateTodos)

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text'

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text)
      })
      .end((err, res)=>{
        if (err) {
          return done(err)
        }

        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(3)
            expect(todos[2].text).toBe(text)
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should not create todo with invalid body data', (done) =>{
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) { return done(err) }

        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(2)
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should return todo doc', (done)=> {
    request(app)
     .get(`/todos/${todos[0]._id.toHexString()}`)
     .expect(200)
     .expect((res) => {
       expect(res.body.todo.text).toBe(todos[0].text)
     })
     .end(done)
  })
  it('should return 404 if todo not found', (done) => {
    const id = new ObjectID
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done)
  })
  it('should return 400 for non-object ids', (done) => {
    request(app)
      .get('/todos/123')
      .expect(400)
      .end(done)
  })
})

describe('PATCH /todos/:id', ()=> {
  it('should update todo', (done) => {
    // grab id of first item
    const hexId = todos[0]._id.toHexString()
    const newText = 'updated text for todo'
    //update text, set completed True
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text: newText
      })
    //200
      .expect(200)
      .expect((res) => {
    // res.body has .text , changed;
        expect(res.body.todo.text).toBe(newText)
    // completed is True
        expect(res.body.todo.completed).toBe(true)
    //completedAt is a number .toBeA(Number)
        expect(res.body.todo.completedAt).toBeA('number')
      })
      .end(done)
  })
  it('should clear completedAt when it\'s not completed', (done) => {
    // grab id of second todo item
    const hexId = todos[1]._id.toHexString()
    const newText = 'updated text for todo'
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text: newText
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newText)
        expect(res.body.todo.completed).toBe(false)
    //text is changed, completed false, completedAt is null .toNotExist()
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    let hexId = todos[1]._id.toHexString()
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=> {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.findById(hexId)
          .then((todo) => {
            expect(todo).toNotExist()
            done()
          })
          .catch(err => done(err))
      })
  })
  it('shoud return 404 if todo not found', (done) => {
    const id = new ObjectID
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done)
  })
  it('shoud return 400 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(400)
      .end(done)
  })
})
