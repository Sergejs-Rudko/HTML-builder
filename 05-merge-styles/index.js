const fs = require('fs').promises;
const path = require('path');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const distPath = path.join(__dirname, 'project-dist');
let content = [];

const beforeEach = async () => {
  try {
    const distFolderFileList = await fs.readdir(distPath);
    if (!distFolderFileList.includes('bundle.css')) {
      createBundle().then(() => {
        console.log('created for a first time');
      });
    } else {
      fs.unlink(bundlePath).then(() => {
        console.log('deleted');
      });
      createBundle().then(
        () => {
          console.log('created again');
        }
      );

    }
  } catch (e) {
    console.log('file does not exist');
  }
};

const createBundle = async () => {
  fs.writeFile(bundlePath, content).then(() => {
    console.log('created');
  });
};

const filesAndFolders = async (folder, content) => {
  try {
    const list = await fs.readdir(folder, {withFileTypes: true});
    const files = list.filter((el) => el.isFile() && el.name.endsWith('.css'));
    const folders = list.filter((el) => el.isDirectory());
    console.log(files);
    files.forEach(file => content.push(`${file.name}`));
    return content;
  } catch (e) {
    console.log(e);
  }
};

filesAndFolders(__dirname).then(() => {
  console.log('process finished');
  console.log(content);
});

