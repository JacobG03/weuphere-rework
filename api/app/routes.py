from app import app
from flask import request, jsonify
from flask_login import current_user, logout_user
from app.models import User


@app.post('/api/user')
def user():
  print('User fetched')
  # returns user: null
  if current_user.is_anonymous:
    return {
      'user': None,
    }
  # returns authenticated user
  elif current_user.is_authenticated:
    return {
      'user': {
        'username': current_user.username,
        'avatar': current_user.image,
      }
    }


@app.post('/api/user/login')
def user_login():
  # prevents possible bugs
  if current_user.is_authenticated:
    return {'msg': 'User already logged in.'}

  # retrieves login data
  login_data = request.get_json()

  user = User.query.filter_by(email=login_data['email']).first()

  if not user:
      return {'success': False, 'message': 'Incorrect email or password.'}
  if user.password != login_data['password']:
      return {'success': False, 'message': 'Incorrect email or password.'}


@app.post('/api/user/logout')
def user_logout():
  logout_user()
  response = {'success': True}
  return jsonify(response), 200