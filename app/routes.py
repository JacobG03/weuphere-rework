from app import app
from flask import render_template, url_for, request, jsonify
from app.models import User


@app.get('/')
@app.post('/')
def index():
    return render_template('index.html')



@app.get('/login')
@app.post('/login')
def login():
    return render_template('login.html')



@app.post('/api/user')
def user():
    user = User.query.first() # Change to current_user
    user_data = {
        'id': user.id,
        'username': user.username,
        'image': user.image,
        'online': user.online,
        'verified': user.verified,
        'current_room': user.current_room,
        'custom_status': user.custom_status,
        'about_me_short': user.about_me_short,
        'about_me_long': user.about_me_long
    }

    return user_data


@app.post('/api/user/<username>')
def choose_user(username):
    user = User.query.filter_by(username=username).first()
    user_data = {
        'username': user.username,
        'image': user.image,
        'online': user.online,
        'custom_status': user.custom_status,
        'about_me_short': user.about_me_short,
        'about_me_long': user.about_me_long
    }

    return user_data


@app.post('/api/friends')
def friends():
    friends_data = []

    friends = User.query.first().friends_list.all() # Change to current_user
    for friend in friends:
        friends_data.append({
            'username': friend.username,
            'image': friend.image,
            'online': friend.online,
            'custom_status': friend.custom_status
        })

    return jsonify(friends_data)

    