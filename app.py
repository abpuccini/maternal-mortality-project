from flask import Flask, render_template, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from os import environ


# Flask set up
app = Flask(__name__)

# To prevent app to to sort keys in json file
app.config['JSON_SORT_KEYS'] = False

# Database set up
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///ETL/output_file/maternal_mortality.sqlite')

db = SQLAlchemy(app)


# Create table schema
class Global(db.Model):
    __tablename__ = 'mmr_global'
    name = db.Column(db.String, primary_key=True)
    mmr = db.Column(db.Integer)
    category = db.Column(db.String)
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/usdata')
def us():
    return render_template('usdata.html')


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
            'geometry': {
                'lat': task.latitude,
                'lng': task.longitude
            },
        }
        mmr_global_data.append(item)

    return jsonify(mmr_global_data)


if __name__ == '__main__':
    app.run(debug=True)
