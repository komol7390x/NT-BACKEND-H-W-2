import { resolve } from 'node:path'
import { writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs'

const filePath = resolve('../../', 'users.json');
const filePath2 = resolve('../../', 'usersr.txt');

const checkFile = async (item) => {
    if (!existsSync(filePath)) {
        writeFile(filePath, '[]')
    }
}
export const write = async (data) => {
    await writeFile(filePath, JSON.stringify(data, null, 2));
}
export const read = async () => {
    await checkFile(filePath2)
    const data = await readFile(filePath, 'utf-8')
    return JSON.parse(data)
}
const res = checkFile().then(res => console.log(res))
