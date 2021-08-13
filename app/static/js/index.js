//* Socket related
socket = io.connect('http://127.0.0.1:5000/')

socket.emit('connected')

socket.on('message', message => {
    console.log(message);
})


