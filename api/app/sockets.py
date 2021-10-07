from app import app, socket
from flask_login import current_user
from app.models import Room
from flask_socketio import SocketIO, emit


@socket.on('connect')
def connected():
    print('Connected')

@socket.on('disconnect')
def disconnected():
    print('Disconnected')
