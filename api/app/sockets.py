from app import socket, db
from flask_login import current_user
from app.models import Room
from flask_socketio import join_room, leave_room, emit, send
from flask import session


@socket.on('message', namespace='/home/chat')
def handle_message(message):
    print(message)
    send(message)