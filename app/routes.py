from app import app
from flask import json, render_template, url_for, request, jsonify, redirect, session, Response
from flask_login import login_required, current_user, logout_user, login_user
from app.models import User


@app.get('/')
@app.post('/')
@login_required
def index():
    return render_template('index.html')


@app.get('/login')
@app.post('/login')
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    return render_template('login.html')


@app.post('/api/users/login')
def user_login():
    login_data = request.get_json()
    user = User.query.filter_by(email=login_data['email']).first()
    if not user:
        return {'success': False, 'message': 'Incorrect email or password.'}
    if user.password != login_data['password']:
        return {'success': False, 'message': 'Incorrect email or password.'}

    login_user(user, remember=login_data['remember_me'])
    return {'success': True}


@app.post('/api/users/register')
def user_register():
    return True


@app.post('/api/users/logout')
@login_required
def user_logout():
    logout_user()
    return {'success': True}


@app.post('/api/users/current_user')
def get_current_user():
    """
    if current_user.is_anonymous:
        return Response(
            'Could not verify your access level for that URL.\n'
            'You have to login with proper credentials', 401)
    """
    return {
        'id': current_user.id,
        'username': current_user.username,
        'image': current_user.image,
        'online': current_user.online,
        'verified': current_user.verified,
        'current_room': current_user.current_room,
        'custom_status': current_user.custom_status,
        'about_me_short': current_user.about_me_short,
        'about_me_long': current_user.about_me_long
    }


@app.post('/api/users/users')
def get_users(username):
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
def get_current_user_friends():
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

    