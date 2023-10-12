const readExcelFile = require('./readFile');
const fetchAudioData = require('./fetchData');

const args = process.argv.slice(2);
const excelFilePath = args[0];
console.log(excelFilePath);
readExcelFile(excelFilePath)
  .then((rows) => {
    if (rows) {
        rows.forEach(row => {
            fetchAudioData(row, row)
        });
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });