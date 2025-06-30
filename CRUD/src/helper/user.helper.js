import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../', 'database');
const dataPath = path.join(filePath, 'data.json')
// -------------------------------------------------------------
// LOCAL Function
const createFolder = async (item) => {
    if (!existsSync(item)) {
        mkdir(item, { recursive: true })
    }
}
const checkFile = async (item) => {
    if (!existsSync(item)) {
        writeFile(item, '[]');
    }
}
// -------------------------------------------------------------
// EXPORT Function
export const read = async () => {
    await createFolder(filePath)
    await checkFile(dataPath)

    const result = await readFile(dataPath, 'utf-8')
    return JSON.parse(result);
}

export const write = async (item) => {
    await writeFile(dataPath, JSON.stringify(item, null, 2))
}

