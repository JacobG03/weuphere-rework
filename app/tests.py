from app import db
from app.models import User


def makeUsers(amount):
    for i in range(amount):
        num = len(User.query.all()) + 1
        user = User(
            username=f'user{num}',
            email=f'user{num}@gmail.com',
            password=f'user{num}'
            )
        db.session.add(user)
        db.session.commit()
    return f'{amount} users created.'


def deleteUsers():
    for user in User.query.all():
        db.session.delete(user)
        db.session.commit()
    return 'All users deleted.'