const request = require('supertest'),
       expect = require('expect')

const app = require('./server').app

it('should return HOME PAGE response', (done) => {
  request(app)
    .get('/')
    .expect((res) => {
      expect(res.body)
        .toInclude({
          error: 'Page not found.'
        })
    })
    // .expect(404)
    // .expect({
    //   error: 'Page not found.'
    // })
    // .expect('home page')
    .end(done)
})

it('should send back users', (done) => {
  request(app)
    .get('/users')
    .expect(200)
    .expect((res) => {
      expect(res.body)
        .toInclude({
          name: 'Domingo',
          age: 29
        })
    })
    .end(done)
})
