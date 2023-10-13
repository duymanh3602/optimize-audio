import fs from 'fs';

export async function readTxtFile(filePath) {
    const fileContent = await fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    return lines;
}