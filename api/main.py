import eventlet
eventlet.monkey_patch()

from app import app, db, socket
from app.models import User, Message, Room


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Message': Message, 'Room': Room}

if __name__ == '__main__':
    socket.run(app, debug=True)