import fetch from 'node-fetch';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

export async function fetchAudioData(url) {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];

  const dataPath = './audio-data/' + fileName;
  const optimizedPath = './optimized/' + fileName;
  
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.buffer();
    } else {
      throw new Error(`Failed to fetch audio file: ${response.status} ${response.statusText}`);
    }
  })
  .then(buffer => {
    fs.writeFileSync(dataPath, buffer);

    ffmpeg(dataPath)
      .audioBitrate('96k')
      .save(optimizedPath)
      .on('end', () => {
        console.log('Optimized: ' + fileName);
      })
      .on('error', (error) => {
        console.error('Error: ' + fileName);
      });
  })
  .catch(error => {
    console.error('Error fetching audio file: ', fileName);
  });
}

// module.exports = {fetchAudioData};

