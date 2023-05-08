const fs = require('fs');
const path = require('path');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const distPath = path.join(__dirname, 'project-dist');

(async function mergeStyles() {
  try {
    const distFolderFileList = await fs.promises.readdir(distPath);
    if (distFolderFileList.includes('bundle.css')) {
      fs.promises.unlink(bundlePath).then(() => {
        console.log('deleted');
      });
    }
    filesAndFolders('styles').then((links) => {
      links = links.map((l) => path.join(__dirname,'styles',l));
      combineFiles(links).then((text) => {
        fs.promises.writeFile(bundlePath,text);
      });
    });
  } catch (err) {
    console.log('file does not exist');
  }
})();

const combineFiles = async (sources) => {
  let text = '';
  try {
    const filePromises = sources.map((source) => fs.promises.readFile(source, 'utf-8'));
    const fileContents = await Promise.all(filePromises);
    text = fileContents.join('');
    return text;
  } catch (err) {
    console.log(err);
  }
};

const filesAndFolders = async (folder) => {
  const folderPath = path.join(__dirname, folder);
  try {
    const list = await fs.promises.readdir(folderPath, {withFileTypes: true});
    const files = list.filter((el) => el.isFile() && el.name.endsWith('.css'));
    return files.map((f) => {
      const file = f.name;
      return file;
    });
  } catch (err) {
    console.log(err);
  }
};
