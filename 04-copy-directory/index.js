const fs = require('fs');
const path = require('path');
const { rm, readdir } = require('fs/promises');
const { exit, stdout } = require('process');
const { EOL } = require('os');

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

const copyFile = async () => {
  await rm(destDir, { recursive: true, force: true }, (err) => {
    if (err) {
      console.log(err);
      exit();
    }
  });

  fs.mkdir(destDir, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
      exit();
    }
  });

  const files = await readdir(srcDir, { withFileTypes: true });
  files
    .filter((file) => file.isFile())
    .forEach((file) => {
      const filePath = path.join(srcDir, file.name);
      const copiedFilePath = path.join(destDir, file.name);
      fs.copyFile(filePath, copiedFilePath, (err) => {
        if (err) {
          console.log(err);
          exit();
        }
      });
    });
  stdout.write(`Copied!${EOL}`);
};

copyFile();
