import fetch from 'node-fetch';
import fs from 'fs';
import ffmpeg from './ffmpeg.js';

export async function fetchAudioData(url) {
  const parts = url.trim().split("/");
  const fileName = parts[parts.length - 1];

  const dataPath = './audio-data/' + fileName;
  const optimizedPath = './optimized/' + fileName;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch audio file ${fileName}: ${response.status} ${response.statusText} `);
    } 
    const bufferArr = await response.arrayBuffer();
    const buffer = Buffer.from(bufferArr);

    await fs.writeFileSync(dataPath, buffer);
    await ffmpeg()
      .input(dataPath)
      .audioBitrate('96k')
      .save(optimizedPath)
      .on('end', () => {
        console.log('Optimized: ' + fileName);
      })
      .on('error', (error) => {
    console.log('Error: ' + fileName + ' - ' + error);
  });
  } catch (error) {
    console.log(error.toString());
  }
}