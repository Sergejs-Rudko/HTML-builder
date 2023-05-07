const fs = require('fs').promises;
const path = require('path');

(function copyDir() {
  const pathForFilesCopy = path.join(__dirname, 'files-copy');
  const pathForFiles = path.join(__dirname,'files');

  //Cheat Code removing files-copy on every use =)
  fs.readdir(__dirname).then((res) => {
    if(res.includes('files-copy')){
      fs.rm(pathForFilesCopy,{recursive : true}).then(()=> {
        console.log('Deleted');
        copyFiles();
      });
    }else{
      copyFiles();
    }
  });

  const copyFiles = () => {
    fs.mkdir(pathForFilesCopy,{recursive : true}).then(()=>{
      console.log('created');
    }).then(()=> {
      fs.readdir(pathForFiles).then((files) => {
        files.forEach((f) => {
          fs.readFile(`${path.join(pathForFiles,f)}`).then(
            (data) => {
              fs.writeFile(`${path.join(pathForFilesCopy,f)}`,data);
            }
          );
        });
      });
    });
  };
})();
