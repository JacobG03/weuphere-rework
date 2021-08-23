from app import socket, db
from flask_login import current_user
from app.models import Room
from flask_socketio import join_room, leave_room, emit, send
from flask import session

online = []

@socket.on('connected')
def connected():
    if current_user.is_authenticated and not current_user.username in online:
        session['username'] = current_user.username
        online.append(current_user.username)

        emit('update user count', {'amount': len(online)}, broadcast=True)
        print(online)


@socket.on('disconnect')
def disconnect():
    online.remove(session['username'])

    emit('update user count', {'amount': len(online)}, broadcast=True)
    print(online)
