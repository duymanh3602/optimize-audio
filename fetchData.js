import fetch from 'node-fetch';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

async function fetchAudioData(url, fileName) {
  // try {
  //   const response = await fetch(url);
  //   const buffer = await response.buffer();
  //   fs.writeFileSync(filePath, buffer);
  //   console.log('Audio data saved successfully!');
  // } catch (error) {
  //   console.error('Error fetching audio data:', error);
  // }
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
        console.log('Audio bitrate optimized successfully!');
      })
      .on('error', (error) => {
        console.error('Error optimizing audio bitrate:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching audio file:', error);
  });
}

// module.exports = {fetchAudioData};

const audioUrl = 'https://img.hoclieu.vn/ktdg/audios/1hHAXcNR7Vl62-SE27R0VItx-iPRN_tWOEIlklcMMVFY_HLTMTA4.1/u7_614.mp3';
const parts = audioUrl.split("/");
const lastPart = parts[parts.length - 1];
// Tên file
// console.log(lastPart);
fetchAudioData(audioUrl, lastPart);