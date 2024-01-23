const fs = require('fs');
const { readdir } = require('fs/promises');
const { join, parse, extname } = require('path');
const { stdout } = require('process');
const { EOL } = require('os');

const dirPath = join(__dirname, 'secret-folder');

const getFilesInfo = async (src) => {
  const files = await readdir(dirPath, { withFileTypes: true });
  files
    .filter((file) => file.isFile())
    .forEach(async (file) => {
      const filePath = join(src, file.name);
      const fileName = parse(filePath).name;
      const fileExtension = extname(filePath).slice(1);
      const stat = await fs.promises.stat(filePath);
      const fileSize = `${(stat.size / 1024).toFixed(3)}kb`;
      stdout.write(`${fileName} - ${fileExtension} - ${fileSize}${EOL}`);
    });
};

getFilesInfo(dirPath);
