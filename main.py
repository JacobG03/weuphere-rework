from app import app, db
from app.models import User, Message, Room
import app.tests as tests


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Tests': tests, 'Message': Message, 'Room': Room}