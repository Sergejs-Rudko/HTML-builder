//1. Create a file
//2. Prompt greeting
//3. On enter get line from prompt and pass it to the file
//4. On ctrl+C or 'exit' say bye, close the process
const path = require('path');
const readline = require('readline');
const FileHandle = require('fs').promises;

//1.
const fileName = 'file.txt';
const pathToFile = path.join(__dirname, fileName);

//2
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const sayBye = () => {
  console.log('Bye!');
  rl.close();
};

(() => {
  console.log('hello');
  rl.on('line',  (userText) => {
    if (userText.trim() !== 'exit') {
      FileHandle.appendFile(pathToFile, `${userText} \n`);
    } else {
      sayBye();
    }
  });
  rl.on('SIGINT', () => {
    sayBye();
  });
})();
