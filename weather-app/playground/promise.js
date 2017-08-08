let somePromise = new Promise ((resolve, reject) => {
  setTimeout(() => {
    resolve('hey, it worked')
    // reject('unable to fulfill promise')
  }, 2500)
})

let anotherPromise = new Promise ((resolve, reject) => {

})

somePromise.then((msg) => {
    console.log('Success: ', msg)
  })
  .catch((err) => {
    console.log('Failed: ', err)
  })
