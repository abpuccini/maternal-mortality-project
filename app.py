from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ


app = Flask(__name__)

# To prevent app to to sort keys in json file
app.config['JSON_SORT_KEYS'] = False


app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///maternal_mortality.sqlite')


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


@app.route('/us')
def us():
    return render_template('us.html')


@app.route('/methodology')
def methodology():
    return render_template('methodology.html')


@app.route('/aboutus')
def aboutus():
    return render_template('aboutus.html')


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
