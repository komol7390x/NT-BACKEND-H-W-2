const fs = require('node:fs').promises;
const path = require('node:path');
const dir = path.join(__dirname, 'text.txt');

class Text {
    async readFile() {
        try {
            const read = await fs.readFile(dir, 'utf-8', (error) => {
                if (error) {
                    console.log('Xatoli bor', error.message);
                }
            });
            return read
        } catch (error) {
            console.log("Xatolik bor! ", error.message);
        }
    }

    async moreWords() {
        try {
            const result = await this.readFile();
            const map = new Map();
            let arr = []
            const result2 = result.split(" ");
            for (let item of result2) {
                map.set(item, map.get(item) + 1 | 1);
            }
            for (let [key, val] of map) {
                if (val > 1) {
                    arr.push({ [key]: val })
                }
            }
            fs.writeFile('task-1.json', JSON.stringify(arr, null, 2), (error) => {
                if (error) {
                    console.log('Xatoli bor', error.message);
                }
            });
        } catch (error) {
            console.log("Xatolik bor! ", error.message);
        }
    }

    async noTryWord() {
        try {
            const res = await this.readFile()
            const result = res.split(" ");
            let arr = [];
            for (let item of result) {
                if (!arr.includes(item)) {
                    arr.push(item)
                }
            }
            const str = arr.join(" ");
            fs.writeFile('task-2.txt', str, (error) => {
                if (error) {
                    console.log('Xatoli bor', error.message);
                }
            })
        } catch (error) {
            console.log("Xatolik bor! ", error.message);

        }
    }
}
const text = new Text();
text.moreWords();
// text.noTryWord()