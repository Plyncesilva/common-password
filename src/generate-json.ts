import crc32 from 'buffer-crc32';
import fs from 'fs';
import path from 'path';

function isNotEmpty(line: any) {
  return Boolean(line.length);
}

function parseLine(line: any) {
  return crc32.unsigned(line.trim());
}

// Get all .txt files in the src/data directory
let directoryPath = './src/data';
let files = fs.readdirSync(directoryPath).filter(file => path.extname(file) === '.txt');

let allResults: number[] = [];

// Process each file
files.forEach(file => {
  let lines = fs.readFileSync(path.join(directoryPath, file)).toString().split('\n');
  let result = lines.filter(isNotEmpty).map(parseLine);
  allResults = allResults.concat(result);
});

// Write the combined results to passwords.json
let json = JSON.stringify(allResults, null, 2);
fs.writeFileSync(path.join(directoryPath, 'passwords.json'), json);

console.log('Processing complete. Results written to passwords.json');
