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
        const folder = key;
        const file = Object.keys(val);
        const text = Object.values(val)
        const folderPath = path.join(treaFolder, folder);

        fs.mkdirSync(folderPath, { recursive: true })

        file.forEach((file, index) => {
            const filePath = path.join(folderPath, file);
            fs.writeFileSync(filePath, text[index], 'utf-8');
        });
    }
    console.log('Papkalar tayor');
}
createFolder()
