const fetch = require('node-fetch');
const fs = require('fs');

async function fetchAudioData(url, filePath) {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFileSync(filePath, buffer);
    console.log('Audio data saved successfully!');
  } catch (error) {
    console.error('Error fetching audio data:', error);
  }
}

// module.exports = {fetchAudioData};

const audioUrl = 'https://img.hoclieu.vn/ktdg/audios/1hHAXcNR7Vl62-SE27R0VItx-iPRN_tWOEIlklcMMVFY_HLTMTA4.1/u7_614.mp3';
const parts = audioUrl.split("/");
const lastPart = parts[parts.length - 1];
const savePath = './optimized/' + lastPart;
fetchAudioData(audioUrl, savePath);