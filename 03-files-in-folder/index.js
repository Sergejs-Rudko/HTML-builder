const fs = require('fs').promises;
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

(async (folder) => {
  try {
    const content = await fs.readdir(folder, {withFileTypes: true});
    const files = content.filter((c) => c.isFile());

    files.forEach((f) => {
      const pathToFile = path.join(pathToFolder, f.name);
      showFileInfo(pathToFile, f.name);
    });
  } catch (error) {
    console.error(error);
  }
})(pathToFolder);

const showFileInfo = async (path, name) => {
  try {
    const stats = await fs.stat(path);
    const fileName = name.match(/(.+?)(\.[^.]*$|$)/)[1];
    const extension = name.match(/\.([^.]+)$/)?.[1];
    //According to readme file conversion into KB is not mandatory.
    console.log(`${fileName} - ${extension} - ${stats.size} bytes`);
  } catch (err) {
    console.log(err);
  }
};
