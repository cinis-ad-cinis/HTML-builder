const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const filePath = path.join(__dirname, 'text.txt');
const src = fs.createReadStream(filePath);
src.pipe(stdout);
