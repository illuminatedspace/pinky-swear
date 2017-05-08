# Pinky Swear

a small node project for exploring Promise functionality added with ES6

---

## Starting Up
1. pinky swear

  ![](https://media.giphy.com/media/l3UcmIFKn6dCvpYyI/giphy.gif)


2. install dependencies with yarn or npm install

  ```yarn```
  or
  ```npm install```


3. run npm start to start the program

  ```npm start```



4. Start making and breaking those Promises by uncommenting out the blocks of code you'd like to run.

The async operations are created throughout the workshop by using the following promisified functions:

Promisified fs.readFile
  ``` function readFilePromise (filePath) {
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
```

and Promisified bufferToString
  ``` function bufferToStringPromise (buffer) {
  return new Promise(function (resolve, reject) {
    if (!buffer.length) {
      console.error('Doesn\'t look like much of anything to me...')
      return reject(new Error('buffer empty!'))
    }
    resolve(buffer.toString('utf8'))
  })
}
```

## Credits

Pinky Promise was inspired by [We Have A Problem with Promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html) by [Nolan Lawson](https://nolanlawson.com/)


This project was made possible with:

* [nodemon](https://nodemon.io/)

* and viewers like you, thank you!
