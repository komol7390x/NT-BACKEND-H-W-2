import { writeFile,readFile } from 'node:fs/promises';
import {existsSync} from 'fs'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathFolder = path.join(__dirname, '../','project_folder')
const jsonFile=path.join(pathFolder,'data.json')
// --------------------------------------------------------------
// WRITE
export const write = async (data) => {
    if(!existsSync(jsonFile)){
         writeFile(jsonFile, '[]');
    }
    writeFile(jsonFile,JSON.stringify(data,2,null))
}
// --------------------------------------------------------------
//READ
export const read = async () => {
    const data=await readFile(jsonFile,'utf-8')
    return JSON.parse(data)
}
