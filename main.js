import { readTxtFile } from './readText.js';
import { fetchAudioData } from './fetchData.js';

const args = process.argv.slice(2);
const filePath = args[0];

readTxtFile(filePath).then((rows) => {
  if (rows) {
    const chunkSize = 10;
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      fetchAudioData(chunk[0]);
      fetchAudioData(chunk[1]);
      fetchAudioData(chunk[2]);
      fetchAudioData(chunk[3]);
      fetchAudioData(chunk[4]);
      fetchAudioData(chunk[5]);
      fetchAudioData(chunk[6]);
      fetchAudioData(chunk[7]);
      fetchAudioData(chunk[8]);
      fetchAudioData(chunk[9]);
    }
  }
})
.catch((error) => {
  console.error('Error:', error);
}); 