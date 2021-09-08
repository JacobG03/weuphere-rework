from app import db
from app.models import User


def validateUsername(username):
    if len(username) > 32:
        return f'Username too long. {len(username)}/32'

    if len(username) < 4:
        return f'Username too short. {len(username)}/4'
    
    if User.query.filter_by(username=username).first():
        return 'Username taken. Try a different one.'

    banned_characters = '`+=}{][|":;<>.,?/)(@!#$%^'
    for i in banned_characters:
        if i in username:
            return f'Character {i} is not allowed.'
    return True


def validateEmail(email):
    if len(email) > 64:
        return f'Email too long. {len(email)}/64.'
    if User.query.filter_by(email=email).first():
        return 'Email taken. Try a different one.'
    if not '@' in email or not '.' in email:
        return 'Invalid email.' 
    return True


def validatePasswords(password1, password2):
    if password1 != password2:
        return "Entered passwords aren't the same."
    if len(password1) > 128:
        return f'Password too long. {len(password1)}/128'
    if len(password1) < 6:
        return f'Password too short.  {len(password1)}/6'
    return True