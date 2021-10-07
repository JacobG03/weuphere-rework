from app import app, socket
from flask_login import current_user
from app.models import Room
from flask_socketio import SocketIO, emit


@socket.on('connect')
def connected():
    emit('sendMessage', {'data': 'user connected'})
    print('Connected')

@socket.on('disconnect')
def disconnected():
    print('Disconnected')

@socket.on('receive:message')
def thisMessage(data):
    print('received message')
    emit('send:message', data, broadcast=True)
