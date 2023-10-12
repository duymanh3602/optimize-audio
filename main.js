import { readExcelFile } from './readFile.js';
import { fetchAudioData } from './fetchData.js';

var logContent;

const args = process.argv.slice(2);
const excelFilePath = args[0];
console.log(excelFilePath);

readExcelFile(excelFilePath)
  .then((rows) => {
    if (rows) {
        rows.forEach((row, index) => {
            fetchAudioData(row[0])
            // console.log(index);
            // console.log(row[0]);
        });
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// const audioUrl = 'https://img.hoclieu.vn/ktdg/audios/1hHAXcNR7Vl62-SE27R0VItx-iPRN_tWOEIlklcMMVFY_HLTMTA4.1/u7_614.mp3';
// const parts = audioUrl.split("/");
// const lastPart = parts[parts.length - 1];
// // Tên file
// // console.log(lastPart);
// fetchAudioData(audioUrl, lastPart);