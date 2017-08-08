console.log('starting')
setTimeout(()=>{
  console.log('inside of callback')
}, 2000)
setTimeout(()=>{
  console.log('second setTimout')
}, 0)
console.log('finish')
