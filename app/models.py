from app import db, login
from flask_login import UserMixin
from datetime import datetime

followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'))
)

friends = db.Table('friends',
    db.Column('friend1_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('friend2_id', db.Integer, db.ForeignKey('user.id'))
)


rooms = db.Table('rooms', 
    db.Column('room_id', db.Integer, db.ForeignKey('room.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)


class User(UserMixin, db.Model):   #UserMixin here
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True)
    email = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(128))
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    online = db.Column(db.Boolean, default=False)
    image = db.Column(db.String(256), default='https://pbs.twimg.com/profile_images/723681919561437186/1Zi2ShOs.jpg')
    verified = db.Column(db.Boolean, default=False)
    current_room = db.Column(db.String(128), default='')
    about_me_short = db.Column(db.String(128), default='')
    about_me_long = db.Column(db.String(420), default='')
    custom_status = db.Column(db.String(32), default='')

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

    def set_password(self, password):
        # Password hashing here
        self.password = password

    def __repr__(self):
        return f'{self.id}'

    
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


class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    users = db.relationship('User', secondary=rooms, lazy='subquery',
                            backref=db.backref('in_rooms', lazy=True))
    last_active = db.Column(db.DateTime)
    


@login.user_loader
def load_user(id):
    return User.query.get(int(id))
