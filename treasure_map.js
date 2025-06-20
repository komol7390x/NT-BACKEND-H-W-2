const fs = require('node:fs');
const path = require('node:path');

const treaFolder = path.join(__dirname, 'treasure_hunt');
const obj = {
    cave: { 'map.txt': "Xaritani o'rganing va yo'lingiznitoping!" },
    forest: { "clue1.txt": "Siz to'g'ri yo'ldasiz! Lekin quyoshbotadigan tomonni unutmang!" },
    desert: { 'clue2.txt': "Jangchi yuragiga ega bo'ling! Xazinayaqin!" },
    hidden_temple: { 'treasure.txt': "Tabriklaymiz! Siz xazinanitopdingiz!" }
}
function createFolder() {
    if (!fs.existsSync(treaFolder)) {
        fs.mkdirSync(treaFolder)
        console.log(treaFolder, " papka yaratildi");
    }

    for (let [key, val] of Object.entries(obj)) {
        const folderPath = path.join(treaFolder, key);
        fs.mkdirSync(folderPath, { recursive: true });

        for (let [file, text] of Object.entries(val)) {
            const lastFolder = path.join(folderPath, file);
            fs.writeFileSync(lastFolder, text, 'utf-8');
        }
    }
    console.log('Papkalar tayor');
}
createFolder()
