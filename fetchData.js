import fetch from 'node-fetch';
import fs from 'fs';
import ffmpeg from './ffmpeg.js';
import mkdirp from 'mkdirp';

export async function fetchAudioData(url) {
  if (url == null) {
    return;
  }
  const parts = url.trim().split("/");
  const fileName = parts[parts.length - 1];

  const dataPath = './audio-data/' + standardizeFileName(url, fileName) + fileName;
  const optimizedPath = './optimized/'+ standardizeFileName(url, fileName) + fileName;
  // tạo folder
  mkdirp('./audio-data/' + standardizeFileName(url, fileName), (err) => {
    if (err) {
      console.error(err);
    }
  });
  mkdirp('./optimized/' + standardizeFileName(url, fileName), (err) => {
    if (err) {
      console.error(err);
    }
  });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch audio file ${fileName}: ${response.status} ${response.statusText} `);
    } 
    
    const bufferArr = await response.arrayBuffer();
    const buffer = Buffer.from(bufferArr);

    fs.writeFileSync(dataPath, buffer);
    ffmpeg()
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

function standardizeFileName(url, fileName) {
  return url.replace("https://img.hoclieu.vn/", "").replace('\r', "").replace(fileName, "").replace("%20", " ");
}