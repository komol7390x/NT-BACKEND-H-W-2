const { createServer } = require('node:http');
const { join } = require('node:path');
const { writeFile, readFile } = require('node:fs/promises');

const filePath = join('./data-4.json')

const writeToFile = async (data) => {
    try {
        await writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(`Erron on write to file: ${error.message}`);
    }
}
const readToFile = async () => {
    try {
        const data = await readFile(filePath, 'utf-8');
        return JSON.parse(data)
    } catch (error) {
        console.log(`Erron on read to file: ${error.message}`);
    }
}
const server = createServer(async (req, res) => {
    if (req.method == 'POST' && req.url == '/') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString()
        });
        req.on('end', async () => {
            const users = await readToFile();
            let data = JSON.parse(body);
            const newUser = {
                id: !users.length ? 1 : users.at(-1)?.id + 1,
                ...data,
            };
            users.push(newUser);
            writeToFile(users);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                message: 'success',
                data: newUser
            }))
        })
    }

    if (req.method == "GET" && req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const read = await readToFile();
        return res.end(
            JSON.stringify({
                message: "Done",
                data: read
            })
        )
    }

    if (req.method == 'GET' && req.url.startsWith('/id')) {
        const id = req.url.split('/')[2];
        const read = await readToFile();
        const user = read.find(res => res.id == id);
        if (!user) {
            res.writeHead(404, { "content-type": "application/json" });
            return res.end(JSON.stringify({
                message: 'User not found'
            }))
        }
        res.writeHead(200, { "content-type": "application/json" });
        return res.end(JSON.stringify({
            message: 'success',
            data: user
        }))
    }
})

server.listen(3002, () => console.log('server running on port 3002'));