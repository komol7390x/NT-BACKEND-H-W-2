const userName = prompt('Ismingizni kiriting: ');
const socket = new WebSocket('ws://localhost:3003', userName)

const input = document.querySelector("#msg");
const btn = document.getElementById('btn');

let user = null;

btn.addEventListener('click', () => {
    const msg = input.value;
    input.value = ''

    socket.send(JSON.stringify({ msg: msg }))
})

socket.onopen = function () {
    console.log('connection to Server')
}

socket.onmessage = function (event) {
    const serverMessage = JSON.parse(event.data);
    if (!user) {
        user = serverMessage
    }
    if (user.id != serverMessage?.id) {
        console.log(serverMessage)
    }
}