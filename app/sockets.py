from app import socket

@socket.on('connected')
def connected():
    print('connected')


@socket.on('disconnect')
def disconnect():
    print('disconnected')