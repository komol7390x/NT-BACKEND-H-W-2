const fs = require('node:fs');
const path = require('node:path');

const treaFolder = path.join(__dirname, 'treasure_hunt');
const obj = {
    cave: { 'map.txt': "Xaritani o'rganing va yo'lingizni toping!" },
    forest: { "clue1.txt": "Siz to'g'ri yo'ldasiz! Lekin quyosh botadigan tomonni unutmang!" },
    desert: { 'clue2.txt': "Jangchi yuragiga ega bo'ling! Xazinayaqin!" },
    hidden_temple: { 'treasure.txt': "Tabriklaymiz! Siz xazinani topdingiz!" }
}
function createFolder() {
    try {
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
    } catch (error) {
        console.log("Xatolik bor!", error.message);
    }

}
function readFolder() {
    try {
        const folder = fs.readdirSync(treaFolder);

        folder.forEach(item => {
            const folderPath = path.join(treaFolder, item);
            if (fs.lstatSync(folderPath).isDirectory()) {
                const files = fs.readdirSync(folderPath)
                files.forEach(value => {
                    const filePath = path.join(folderPath, value);
                    const read = fs.readFileSync(filePath, 'utf-8');
                    console.log(`Papka nomi: ${item}\nFile nomi: ${files}\nXabar: ${read}\n--------------------`);
                })
            }
        })
    } catch (error) {
        console.log("Xatolik bor!", error.message);
    }
}


// createFolder()
// readFolder()
