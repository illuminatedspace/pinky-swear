const fs = require('fs')

//promisified readfile function
//this function is used as the base promise returning function
//takes a filepath relative to this function as a string
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

//promisified toString console log
function bufferToStringPromise (buffer) {
  return new Promise(function (resolve, reject) {
    if (!buffer.length) {
      console.error('Doesn\'t look like much of anything to me...')
      return reject(new Error('buffer empty!'))
    }
    resolve(buffer.toString('utf8'))
  })
}


//what a promise fulfilled to resolve sucessfully looks like
//will read Antigone and console log the buffer
/*readFilePromise('./text-files/antigone.txt')
  .then(result => {
    console.log(result.toString('utf8').slice(49547, 49719))
  })
  .catch(console.error)*/

//a promise fulfilled to reject with an unhandled error (no .catch())
/*  readFilePromise('notAFile.txt')
  .then(result => {console.log(result)})*/

//a promise fulfilled to reject with a handled error (with .catch())
/*  readFilePromise('notAFile.txt')
  .then(result => {console.log(result)})
  .catch(console.error)*/

//a promise that returns another promise
/*readFilePromise('./text-files/antigone.txt')
  .then((antigoneBuffer) => {
    return bufferToStringPromise(antigoneBuffer)
  })
  .then((antigoneText) => console.log(antigoneText.slice(0, 100)))
  .catch(console.error)*/

//a promise that invokes but doesn't return another promise
readFilePromise('./text-files/antigone.txt')
  .then((antigoneBuffer) => {
    bufferToStringPromise(antigoneBuffer)
  })
  .then((antigoneText) => console.log(antigoneText.slice(0, 100)))
  .catch(console.error)

//a promise that returns a synchronus value

//a promise that throws a synchronus error
