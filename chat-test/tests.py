from main import app, db, User, Message


def createUsers():
    amount = 10
    for i in range(amount):
        user = User(username=f'User-{i + 1}')
        db.session.add(user)
        db.session.commit()
    print(f'{amount} users created')
    return True


def deleteUsers():
    users = User.query.all()
    for i in range(len(users)):
        db.session.delete(users[i])
    db.session.commit()
    print('All users deleted')
    return True

createUsers()