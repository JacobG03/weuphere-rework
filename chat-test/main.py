import eventlet
eventlet.monkey_patch()

from flask import Flask, render_template, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO, emit, send
from flask_login import current_user, UserMixin, LoginManager
from datetime import datetime


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True


db = SQLAlchemy(app)
migrate = Migrate(app, db)
socket = SocketIO(app)
login = LoginManager(app)
login.login_view = 'login'





followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'))
)

friends = db.Table('friends',
    db.Column('friend1_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('friend2_id', db.Integer, db.ForeignKey('user.id'))
)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True, nullable=False)
    account_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    messages = db.relationship('Message',
                                foreign_keys='Message.recipient_id',
                                backref='recipient', lazy='dynamic')

    followed = db.relationship('User', secondary=followers,
                                        primaryjoin=(followers.c.follower_id == id),
                                        secondaryjoin=(followers.c.followed_id == id),
                                        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')
    
    friends_list = db.relationship('User', secondary=friends,
                                        primaryjoin=(friends.c.friend1_id == id),
                                        secondaryjoin=(friends.c.friend2_id == id),
                                        backref=db.backref('friends', lazy='dynamic'), lazy='dynamic')

    def __repr__(self):
        return f'{self.id}, {self.username}, {self.account_created}'

    
    def add_friend(self, user):
        if not self.is_friend(user):
            self.friends_list.append(user)
            user.friends_list.append(self)

    def remove_friend(self, user):
        if self.is_friend(user):
            self.friends_list.remove(user)
            user.friends_list.remove(self)

    def is_friend(self, user):
        return self.friends_list.filter(
            friends.c.friend2_id == user.id).count() > 0


    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    recipient_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    room = db.Column(db.String(128))
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<Message {}>'.format(self.body)


@login.user_loader
def load_user(id):
    return User.query.get(int(id))




@app.get('/')
@app.post('/')
def index():
    if current_user.is_anonymous:
        users = User.query.all()
        if request.method == 'POST':
            username = request.values.get('username')
            user = User.query.filter_by(username=username).first()
            login_user(user)
            return render_template('index.html', user=current_user)
        return render_template('login.html', users=users)
    elif current_user.is_authenticated:
        return render_template('index.html', user=current_user)
        


@socket.on('connection')
def connection(name):
    send(f'{name} has connected!')





@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Message': Message}

if __name__ == "__main__":
    socket.run(app)