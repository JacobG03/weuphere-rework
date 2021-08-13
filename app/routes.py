from app import app
from flask import render_template, url_for, request


@app.get('/')
@app.post('/')
def index():
    return render_template('index.html')