const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout, exit } = require('process');
const { EOL } = require('os');

const filePath = path.join(__dirname, 'text.txt');
const input = readline.createInterface(stdin);
const output = fs.createWriteStream(filePath, 'utf-8');

stdout.write(`Hello! Type something...${EOL}`);

input.on('line', (data) => {
  if (data === 'exit') {
    stdout.write(`Bye-bye!${EOL}`);
    exit();
  }
  output.write(`${data}${EOL}`);
});

process.on('SIGINT', () => {
  stdout.write(`${EOL}Bye-bye!${EOL}`);
  exit();
});
