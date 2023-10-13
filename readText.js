import fs from 'fs';
import readline from 'readline';
import { fetchAudioData } from './fetchData.js';

export function readTxtFile(filePath) {
  const fileStream = fs.createReadStream(filePath, 'utf-8');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  rl.on('line', (line) => {
    fetchAudioData(line);
  });

  rl.on('close', () => {
    console.log('Read all');
  });
}