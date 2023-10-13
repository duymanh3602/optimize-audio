import { readTxtFile } from './readText.js';
import { fetchAudioData } from './fetchData.js';

const args = process.argv.slice(2);
const filePath = args[0];
let promiseAll = [];

readTxtFile(filePath).then((rows) => {
  if (rows) {
    const chunkSize = 10;
    for (let i = 0; i < rows.length; i += chunkSize) {
      let promiseAll = [];
      const chunk = rows.slice(i, i + chunkSize);
      for (let j = 0; j < chunk.length; j++) {
        promiseAll.push(fetchAudioData(chunk[j]))
      }
      Promise.all(promiseAll);
    }
  }
})
.catch((error) => {
  console.error('Error:', error);
}); 