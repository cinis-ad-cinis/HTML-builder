const fs = require('fs');
const { readdir, rm } = require('fs/promises');
const { join, extname } = require('path');
const { stdout } = require('process');
const { EOL } = require('os');
const { pipeline } = require('stream');

const srcDir = join(__dirname, 'styles');
const destDir = join(__dirname, 'project-dist');
const filePath = join(destDir, 'bundle.css');

const createBundle = async () => {
  const files = await readdir(srcDir, { withFileTypes: true });
  files
    .filter(
      (file) =>
        file.isFile() &&
        extname(join(__dirname, 'styles', file.name)) === '.css',
    )
    .forEach(async (file) => {
      const input = fs.createReadStream(
        join(__dirname, 'styles', file.name),
        'utf-8',
      );
      await rm(filePath, { recursive: true, force: true });
      const output = fs.createWriteStream(filePath, { flags: 'a' });
      pipeline(input, output, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    });
  stdout.write(`All styles have been merged${EOL}`);
};

createBundle();
