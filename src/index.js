import "@babel/polyfill";


// eslint-disable-next-line func-style
const a = (num)=>new Promise((resolve,reject)=>{
    if (num>10) {
      resolve(num)
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('错误')
    }
  })

a(20).then(data=>{
  console.log('111:',data)
})

a(2).then(data=>{
  console.log('222:',data)
})



