const { readdir, stat } = require('fs');
const { join, parse, extname } = require('path');
const { stdout } = require('process');
const { EOL } = require('os');

const dirPath = join(__dirname, 'secret-folder');

readdir(dirPath, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  files
    .filter((file) => file.isFile())
    .forEach((file) => {
      const filePath = join(dirPath, file.name);
      const fileName = parse(filePath).name;
      const fileExtension = extname(filePath).slice(1);
      stat(filePath, (err, stats) => {
        if (err) console.log(err);
        const fileSize = `${(stats.size / 1024).toFixed(3)}kb`;
        stdout.write(`${fileName} - ${fileExtension} - ${fileSize}${EOL}`);
      });
    });
});
