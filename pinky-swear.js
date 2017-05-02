const fs = require('fs')

//promisified readfile function
//this function is used as the base promise returning function
//takes a filepath relative to this function as a string
function readFilePromise (filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, function (err, file) {
      if (err) {
        console.log('ERROR: There\'s been a grevious error')
        return reject(err)
      }
      resolve(file)
    })
  })
}

//what a promise fulfilled to resolve sucessfully looks like
//will read Antigone and console log the buffer
/*readFilePromise('antigone.txt')
  .then(result => {console.log(result.toString('utf8').slice(49547, 49719))})
  .catch(console.error)*/

//a promise fulfilled to reject with an unhandled error (no .catch())
/*  readFilePromise('notAFile.txt')
  .then(result => {console.log(result)})*/

//a promise fulfilled to reject with an handled errors (with .catch())
  readFilePromise('notAFile.txt')
  .then(result => {console.log(result)})
  .catch(console.error)
