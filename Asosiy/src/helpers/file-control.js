import { resolve } from 'node:path'
import { writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs'

const filePath = resolve('../../', 'users.json');
const checkFile = async (item) => {
    if (!existsSync(item)) {
        writeFile(item, '[]')
    }
}
export const write = async (data) => {
    await writeFile(filePath, JSON.stringify(data, null, 2));
}
export const read = async () => {
    await checkFile(filePath)
    const data = await readFile(filePath, 'utf-8')
    return JSON.parse(data)
}

// read().then(res => console.log(res))
