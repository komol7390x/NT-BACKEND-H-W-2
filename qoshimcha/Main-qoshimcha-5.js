const { createServer } = require('node:http');
const { writeToFile, readFromFile } = require('./qoshimcha-5-2');
const { log } = require('node:console');

const server = createServer(async (req, res) => {
    const method = req.method
    const url = req.url
    //CREATE
    if (method == 'POST' && url == '/fruits') {
        let body = ''
        req.on('data', chunk => {
            body += chunk
        })
        req.on('end', async () => {
            let read = await readFromFile();
            const data = JSON.parse(body)
            const newUser = {
                id: !read.length ? 1 : read.at(-1).id + 1, ...data
            }
            read.push(newUser);
            writeToFile(read);
            res.writeHead(201, { 'content-type': 'application:json' });
            res.end(JSON.stringify({
                statuCode: 201,
                message: 'Done',
                data: newUser
            }))
        })
    }
    //READ
    if (method == "GET" && url == '/fruits') {
        let read = await readFromFile();
        res.writeHead(200, { 'content-type': 'application:json' });
        res.end(JSON.stringify({
            statusCode: 200,
            message: 'Done',
            data: read
        }))
    }
    //UPDATE
    if (method == "PUT" && url.startsWith('/fruits/id/')) {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            let read = await readFromFile();
            id = url.split('/')[3]
            const index = read.findIndex(res => res.id === +id);
            if (index == -1) {
                res.writeHead(404, { 'content-type': 'application:json' });
                return es.end(JSON.stringify({
                    statuCode: 404,
                    message: `Not found Users: ${id}`
                }))
            }
            const updateUser = { id: index, ...JSON.parse(body) }
            read[index] = updateUser
            await writeToFile(read)
            res.writeHead(200, { 'content-type': 'application:json' })
            return res.end(
                JSON.stringify({
                    statusCode: 200,
                    message: 'Done',
                    data: updateUser
                })
            )
        })

    }
    //DELETE
    if (method == 'DELETE' && url.startsWith('/fruits/id')) {
        console.log(method);
        let read = await readFromFile();
        id = url.split('/')[3]
        const index = read.findIndex(res => res.id === +id);
        if (index == -1) {
            res.writeHead(404, { 'content-type': 'application:json' });
            return res.end(JSON.stringify({
                statuCode: 404,
                message: `Not found Users: ${id}`
            }))
        }
        read.splice(index, 1);
        await writeToFile(read)
        res.writeHead(200, { 'content-type': 'application:json' })
        return res.end(
            JSON.stringify({
                statusCode: 200,
                message: 'Done',
                data: "delete"
            })
        )
    }
})
const PORT = 3002
server.listen(PORT, () => console.log(`Server is running ${PORT} port`))
