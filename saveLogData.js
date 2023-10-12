import fs from 'fs';
import XLSX from 'xlsx';
import path from 'path';

const options = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
};

export async function saveExcelFile(jsonData) {
    let dataSource = [
        "STT",
        "File Path",
        "Status",
    ];    

    const data = jsonData;
    const excelTable = [];

    excelTable.push(dataSource);

    for (let i = 0; i < data.length; i++) {
        const rowExcel = [];
        rowExcel.push(data[i]);
        excelTable.push(rowExcel);
    }

    const wb = XLSX.utils.book_new();

    const wsName = 'status log';
    const ws = XLSX.utils.aoa_to_sheet(excelTable);

    XLSX.utils.book_append_sheet(wb, ws, wsName);

    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    const timestamp = new Date().getTime();
    const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', options).replace(/[/:]/g, '-');
    let fileName = '[hoclieu.vn] - Optimize audio log - ' + formattedTimestamp + '.xlsx';
    const filePath = path.join('./log', fileName);

    fs.writeFileSync(filePath, excelBuffer);
}