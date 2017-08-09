let asyncAdd = (a, b) => {
  return new Promise((resolve, reject) =>{
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve (a + b)
      } else {
        reject('Arguments must be numbers')
      }
    }, 1500)
  })
}

asyncAdd(4,3.4)
  .then((res) => {
    console.log('result: ', res)
    return asyncAdd(res, 33)
  })
  .then ((res) => {
    console.log('another result: ', res)
  })
  .catch((err) => {
    console.log(err)
  })

// let somePromise = new Promise ((resolve, reject) => {
//   setTimeout(() => {
//     resolve('hey, it worked')
//     // reject('unable to fulfill promise')
//   }, 2500)
// })
//
// let anotherPromise = new Promise ((resolve, reject) => {
//
// })
//
// somePromise.then((msg) => {
//     console.log('Success: ', msg)
//   })
//   .catch((err) => {
//     console.log('Failed: ', err)
//   })
