const { get } = require('http');
let index = require('./index');
let index2 = require('./index2');
let test = require('./test');
// index.check_message(23670424,"關注清單")

// async function quest(promise) {
//     let text = await index2.list(2330).then(function(result) {
//       })
//     return text
// }

// console.log(quest())

// Promise.all([test.oneSecond()])
//   .then(([oneSecond]) => {
//     console.log(oneSecond)
//   })

Promise.all([index2.list(2330)])
  .then(([oneSecond]) => {
    var x = oneSecond
    console.log(x)
  })






