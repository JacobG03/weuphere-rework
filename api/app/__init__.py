import eventlet
eventlet.monkey_patch()


from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO
from flask_login import LoginManager
from config import Config
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
socket = SocketIO(app)
login = LoginManager(app)
login.login_view = 'login'
CORS(app)


from app import routes, sockets