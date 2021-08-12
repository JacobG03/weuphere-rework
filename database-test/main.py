from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)
migrate = Migrate(app, db)


followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'))
)

friends = db.Table('friends',
    db.Column('friend1_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('friend2_id', db.Integer, db.ForeignKey('user.id'))
)

class User(db.Model):
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


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Message': Message}


if __name__ == "__main__":
	app.run()