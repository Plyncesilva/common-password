import crc32 from 'buffer-crc32';
import fs from 'fs';

function isNotEmpty(line: any) {
  return Boolean(line.length);
}

function parseLine(line: any) {
  return crc32.unsigned(line.trim());
}

let lines = fs.readFileSync('./src/data/10k most common.txt').toString().split('\n');
let result = lines.filter(isNotEmpty).map(parseLine);
let json = JSON.stringify(result, null, 2);
fs.writeFileSync('./src/data/10k most common.json', json);
