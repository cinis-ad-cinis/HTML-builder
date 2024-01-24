const fs = require('fs');
const path = require('path');
const { exit, stdout } = require('process');
const { EOL } = require('os');

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

fs.mkdir(destDir, { recursive: true }, (err) => {
  if (err) {
    console.log(err);
    exit();
  }
});

fs.readdir(srcDir, (err, files) => {
  if (err) {
    console.log(err);
    exit();
  }
  files.forEach((file) => {
    const filePath = path.join(srcDir, file);
    const copiedFilePath = path.join(destDir, file);
    fs.copyFile(filePath, copiedFilePath, (err) => {
      if (err) {
        console.log(err);
        exit();
      }
    });
  });
  stdout.write(`Copied!${EOL}`);
});
