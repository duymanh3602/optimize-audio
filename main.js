import { readTxtFile } from './readText.js';

const args = process.argv.slice(2);
const filePath = args[0];

readTxtFile(filePath);