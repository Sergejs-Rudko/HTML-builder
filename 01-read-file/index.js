const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
let data = '';
const stream =  fs.createReadStream(pathToFile,{encoding : 'utf-8'});

stream.on('data', chunk => {
  data += chunk;
});

stream.on('end', () => {
  console.log(data);
});
