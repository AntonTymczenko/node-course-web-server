let getUser = (id, callback) => {
  let user = {
    id,
    name: 'Trololo'
  }
  setTimeout(() => {
    callback(user)
  }, 3000)
}

getUser(777, (user) => {
  console.log(user)
})
console.log('yo')
