console.log('hello')

socket = io.connect('http://127.0.0.1:5000/')
var username = document.getElementById('username').innerHTML
socket.emit('connection', username);

socket.on('message', message => {
    console.log(message);
})