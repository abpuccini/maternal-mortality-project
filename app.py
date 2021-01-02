from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import database_local
from os import environ

from boto.s3.connection import S3Connection

app = Flask(__name__)

# To prevent app to to sort keys in json file
app.config['JSON_SORT_KEYS'] = False


database_local = S3Connection(environ['DATABASE_URL'])

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', database_local)


db = SQLAlchemy(app)


class Global(db.Model):
    __tablename__ = 'mmr_global'
    name = db.Column(db.String, primary_key=True)
    mmr = db.Column(db.Integer)
    category = db.Column(db.String)
    location = db.Column(db.String)
    country = db.Column(db.String)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/mmr-global')
def getGlobaldata():
    tasks = db.session.query(Global)
    mmr_global_data = []

    for task in tasks:
        item = {
            'name': task.name,
            'mmr': task.mmr,
            'category': task.category,
            'location': task.location,
            'country': task.country
        }
        mmr_global_data.append(item)

    return jsonify(mmr_global_data)


if __name__ == '__main__':
    app.run(debug=True)
