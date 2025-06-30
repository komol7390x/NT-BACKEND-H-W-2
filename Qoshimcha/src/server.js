const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3003 });

const userId = new Set()

wss.on('listening', () => console.log('serveris runing 3003'));
wss.on('connection', (ws, res) => {
    console.log('client is connection');

    const userName = res.headers['Sec-WebSocket-Protocol'];
    console.log('bu server', userName);

    const id = Math.random().toString(36).slice(2);
    userId.add(id);
    ws.send(JSON.stringify({ id, user: userName }))

    ws.on('message', (data) => {
        const clientMessage = JSON.stringify(data.toString())

        wss.clients.forEach(client => {
            client.send(JSON.stringify({ id, user: userName, ...clientMessage }))
            console.log(JSON.parse(clientMessage));

        })
    })
})
