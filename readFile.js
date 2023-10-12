const ExcelJS = require('exceljs');

async function readExcelFile(filePath) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);
    const rows = [];

    worksheet.eachRow((row, rowNumber) => {
      const rowData = [];
      row.eachCell((cell) => {
        rowData.push(cell.value);
      });
      rows.push(rowData);
    });

    return rows;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return null;
  }
}

module.exports = {readExcelFile};