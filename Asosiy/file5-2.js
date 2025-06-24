const { join } = require('node:path');
const { writeFile, readFile } = require('node:fs/promises');

const filePath = join('data5-2.json');
const writeToFile = async (data) => {
    try {
        await writeFile(filePath, JSON.stringify(data, null, 2))
    } catch (error) {
        console.log(`Error to write file :(`);
    }
}
const readFromFile=async()=>{
    const data=await readFile(filePath,'utf-8');
    return JSON.parse(data)
}

module.exports={writeToFile,readFromFile}