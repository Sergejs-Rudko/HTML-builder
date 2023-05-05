//1. Create a file
//2. Prompt greeting
//3. On enter get line from prompt and pass it to the file
//4. On ctrl+C or 'exit' say bye, close the process
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
  console.log('Hello!');
  rl.on('line', (userText) => {
    if (userText.trim() !== 'exit') {
      const textWithEnter = `${userText} \n`;
      fs.writeFile(pathToFile, textWithEnter,{flag : 'a'}, (err) => {
        if (err) {
          console.log('smthing went wrong');
        }
      });
    } else {
      sayBye();
    }
  });
})();

process.on('SIGINT',()=>{
  sayBye();
});

