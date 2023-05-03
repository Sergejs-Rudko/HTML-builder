const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');

fs.readFile(pathToFile, (err, data) => {
  if (err) {
    console.log('look for errors')
    return;
  }
  console.log(data.toString());
});
