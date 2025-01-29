import fs from 'fs';

export const createFileIfDoesNotExist = async (fileName: string) => {
    if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, '', 'utf-8');
        console.log(`${fileName} file created`);
    }
}