from app import app, db
from app.models import User, Message, Room
import app.scripts as scripts


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Scripts': scripts, 'Message': Message, 'Room': Room}