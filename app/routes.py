from flask_login.utils import login_required
from app import app
from flask import render_template, url_for, request, jsonify, redirect
from flask_login import login_required, current_user
from app.models import User


@app.get('/')
@app.post('/')
def index():
    if current_user.is_anonymous:
        return redirect('login')
    return render_template('index.html')


@app.get('/login')
@app.post('/login')
def login():
    return render_template('login.html')


@app.post('/api/users/current_user')
def user():
    #! return current user
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


@app.post('/api/users/users')
def choose_user(username):
    # !send list of usernames
    # for user in usernames
    # ! return dict with these users data
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


@app.post('/api/users/current_user/friends')
def friends():
    #! return current_user friends
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

    