import { readExcelFile } from './readFile.js';
import { fetchAudioData } from './fetchData.js';

const args = process.argv.slice(2);
const excelFilePath = args[0];
console.log(excelFilePath);

readExcelFile(excelFilePath)
  .then((rows) => {
    if (rows) {
        rows.forEach((row, index) => {
          fetchAudioData(row[0]);
        });
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });