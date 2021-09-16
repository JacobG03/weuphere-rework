from app import app
from flask import json, render_template, url_for, request, jsonify, redirect, session, Response
from flask_login import login_required, current_user, logout_user, login_user
from app.models import User
from app.validations import *


@app.get('/')
@app.post('/')
@login_required
def index():
    if not current_user.verified:
        return redirect(url_for('login'))
    return render_template('index.html')


@app.get('/api/auth')
@app.post('/api/auth')
def auth():
    if current_user.is_authenticated:
        return {
            'state': 1,
            'user': {
                'username': current_user.username,
                'image': current_user.image
            }
        }
    return {
        'state': 0,
        'user': None
        }


@app.post('/api/login')
def login():
    #? prevent spamming
    if current_user.is_authenticated:
        print('already auth')
        return {'notify': True, 'message': 'You are already signed in!'}

    login_data = request.get_json()

    user = User.query.filter_by(email=login_data['email']).first()
    if not user:
        return {'success': False, 'message': 'Incorrect email or password.'}
    if user.password != login_data['password']:
        return {'success': False, 'message': 'Incorrect email or password.'}


    login_user(user)
    print('success')
    return {'success': True}


@app.post('/api/register')
def register():
    register_data = request.get_json()
    failed_response = {'success': False}

    valid_username = validateUsername(register_data['username'])
    if valid_username != True:
        failed_response['username'] = valid_username
    
    valid_email = validateEmail(register_data['email'])
    if valid_email != True:
        failed_response['email'] = valid_email
    
    valid_passwords = validatePasswords(register_data['password1'], register_data['password2'])
    if valid_passwords != True:
        failed_response['password'] = valid_passwords

    if len(failed_response) > 1:
        return failed_response
        
    user = User(username=register_data['username'], email=register_data['email'])
    user.set_password(register_data['password1'])

    db.session.add(user)
    db.session.commit()

    login_user(user)

    return {'success': True}


@app.post('/api/users/logout')
@login_required
def user_logout():
    logout_user()
    return {'success': True}


@app.post('/api/users/current_user')
def get_current_user():
    if current_user.is_anonymous:
        return Response(
            'Could not verify your access level for that URL.\n'
            'You have to login with proper credentials', 401)
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



@app.post('/api/users/<start>/<end>')
def get_users(start, end):
    data = []
    users = User.query.all()
    for i in range(int(start), int(end)):
        try:
            if users[i]:
                pass
        except IndexError:
            return jsonify(data)
        
        user_data = {
            'id': users[i].id,
            'username': users[i].username,
            'image': users[i].image,
            'online': users[i].online,
        }
        data.append(user_data)
    return jsonify(data)


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