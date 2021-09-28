from app import app
from flask import request, jsonify
from flask_login import current_user, logout_user, login_user
from app.models import User


@app.post('/api/user')
def user():
  print('User fetched')
  # returns authenticated user
  print(current_user.is_authenticated)
  if current_user.is_authenticated:
    return {
      'user': {
        'username': current_user.username,
        'avatar': current_user.image,
      }
    }
  return {
    'user': None,
  }
  # returns user: null


@app.post('/api/user/login')
def user_login():
  # prevents possible bugs
  if current_user.is_authenticated:
    return {'msg': 'User already logged in.'}

  # retrieves login data
  login_data = request.get_json()
  
  user = User.query.filter_by(email=login_data['email']).first()

  if not user:
      return {'success': False, 'msg': 'Incorrect email or password.'}
  if user.password != login_data['password']:
      return {'success': False, 'msg': 'Incorrect email or password.'}

  login_user(user)
  print(f'{user.username} logged in.')
  return {
      'success': True,
      'msg': 'Logged in successfully!',
      'user': {
        'username': current_user.username,
        'avatar': current_user.image,
      }
    }


@app.post('/api/user/logout')
def user_logout():
  try:
    print(f'{current_user.username} logged out.')
  except AttributeError:
    print('Anonymous user tried to logout.')
    # Prevent spamming this
  
  logout_user()
  response = {'success': True}
  return jsonify(response), 200



@app.post('/home/users')
def home_users():
  if current_user.is_anonymous:
    return {'success': False}, 200

  users = []

  query = request.get_json()['query']

  # query with filter
  if len(query) >= 1:
     for user in User.query.filter(User.username.contains(query)):
      users.append({
        'id': user.id,
        'username': user.username,
        'avatar': user.image,
      })

  else:
    # default query
    for user in User.query.all():
      users.append({
        'id': user.id,
        'username': user.username,
        'avatar': user.image,
      })
  
  response = {
    'success': True,
    'users': users
  }
  return jsonify(response), 200