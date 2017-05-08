const fs = require('fs')

////this function is used as the base promise returning function
////takes a filepath relative to this function as a string
////promisified fs.readFile function
////fs.readfile: https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback
////new Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
function readFilePromise (filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, function (err, file) {
      if (err) {
        console.error('There\'s been a grevious error')
        return reject(new Error('there\'s no file there'))
      }
      resolve(file)
    })
  })
}

// //can't figure out how seperate wrapping the fsReadFile
// //and promisifing the fs.readFile
// //.readFile needs path to the file to read
// //this function is used as the base promise returning function
// //takes a filepath relative to this function as a string
// const readFileWrapper = function (resolve, reject) {
//   fs.readFile(filePath, function (err, file) {
//     if (err) {
//       console.error('There\'s been a grevious error')
//       return reject(new Error('there\'s no file there'))
//     }
//     resolve(file)
//   })
// }

// function readFilePromise () {
//   return new Promise(readFileWrapper)
// }



//promisified toString
function bufferToStringPromise (buffer) {
  return new Promise(function (resolve, reject) {
    if (!buffer.length) {
      console.error('Doesn\'t look like much of anything to me...')
      return reject(new Error('buffer empty!'))
    }
    resolve(buffer.toString('utf8'))
  })
}

//promise .resolve has the same functionality with less
//lines of code than the above example ^^^ with no reject method
//*? little iffy on this
function bufferResolve (buffer) {
  return Promise.resolve(buffer.toString('utf8'))
}

///*/////////////////////// EXAMPLES~~~~~~~~~~~~*/
// //what a promise fulfilled to resolve sucessfully looks like
// //will read Antigone and console log the buffer
// readFilePromise('./text-files/antigone.txt')
//   .then(result => {
//     console.log(result.toString('utf8').slice(49547, 49719))
//   })
//   .catch(console.error)

////a promise fulfilled to reject with an unhandled error (no .catch())
/*  readFilePromise('notAFile.txt')
  .then(result => {console.log(result)})*/

////a promise fulfilled to reject with a handled error (with .catch())
/*  readFilePromise('notAFile.txt')
  .then(result => {console.log(result)})
  .catch(console.error)*/

//a promise that returns another promise
// readFilePromise('./text-files/antigone.txt')
//   .then((antigoneBuffer) => {
//     return bufferToStringPromise(antigoneBuffer)
//   })
//   .then((antigoneText) => console.log(antigoneText.slice(0, 100)))
//   .catch(console.error)

//a promise that returns another promise with Promise.resolve
// readFilePromise('./text-files/jackBeanstalk.txt')
//   .then((jackBuffer) => {
//     return bufferResolve(jackBuffer)
//   })
//   .then((jackText) => console.log('hey gurl', jackText.slice(0, 100)))
//   .catch(console.error)

////a promise that invokes but doesn't return another promise
/*readFilePromise('./text-files/antigone.txt')
  .then((antigoneBuffer) => {
    bufferToStringPromise(antigoneBuffer)
  })
  .then((antigoneText) => console.log(antigoneText.slice(0, 100)))
  .catch(console.error)*/

////a promise that returns a synchronus value
/*readFilePromise('./text-files/rapunzel.txt')
  .then((rapunzelBuffer) => {
    const rapunzelString = rapunzelBuffer.toString('utf8')
    // console.log(rapunzelString.slice(0, 100))
    return rapunzelBuffer.toString('utf8') //a synchronus value, not a value from an async request
  })
  .then((string) => { //string is the whole rapunzel text
    console.log(string.slice(0, 100)) //not returning anything, side effect
  })
  .catch(console.error)*/

////a promise that throws a synchronus error
// readFilePromise('./text-files/jackBeanstalk.txt')
//   .then((jackBeanstalkBuffer) => {
//     if (jackBeanstalkBuffer.length === 0) { //if the file is empty, throw an error
//       throw new Error('*you open the file and a moth flies out*')
//     }
//   })
//   .catch(console.error)


//.catch methods
//a .then function actually can take two arguments
// .then(resolveCallback, rejectCallback)
//so when we write .then((result) => {
//   console.log(result)
// })
//it's the same as writing:
//.then(resolveCallback, null)
//.then((result) => console.log(result), null)

//so this works
// readFilePromise('./text-files/antigone.txt')
// .then((buffer) => { //nothing's happening with buffer, but it's returned from readFilePromise none the less
//   throw new Error('This is a sync error that will be caught!');
// })
// .catch((err) => {
//   console.error(err)
// })

// // //but this doesn't
// readFilePromise('./text-files/antigone.txt')
// .then(() => {
//   throw new Error('This is a sync error that will not be caught!')
// }, (err) => {
//   console.error(err)
// })

//because .then are promises that can fulfil to resolve or reject, they cannot fulfil to resolve and then catch their own error in the same .then. A .then with a reject method will catch the second example.
readFilePromise('./text-files/antigone.txt')
.then(() => {
  throw new Error('This is a sync error that will not be caught!')
}, (err) => {
  console.error(err)
})
.then(null, (err) => {
  console.log('The uncaught sync error will be caught by this .then')
  console.error(err)
})
