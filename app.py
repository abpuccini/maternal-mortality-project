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


class CDC(db.Model):
    __tablename__ = 'mmr_us'
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(255))
    state_code = db.Column(db.Integer)
    year = db.Column(db.Integer)
    deaths = db.Column(db.Integer)
    births = db.Column(db.Integer)
    maternal_mortality_ratio = db.Column(db.Float)
    population = db.Column(db.Integer)


class Ins(db.Model):
    __tablename__ = 'ins_us'
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(255))
    year = db.Column(db.Integer)
    employer = db.Column(db.Float)
    non_group = db.Column(db.Float)
    medicaid = db.Column(db.Float)
    medicare = db.Column(db.Float)
    military = db.Column(db.Float)
    uninsured = db.Column(db.Float)
    total = db.Column(db.Integer)


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


@app.route('/api/mmr-us')
def getUSdata():
    tasks = db.session.query(CDC)
    mmr_us_data = []

    for task in tasks:
        item = {
            'id': task.id,
            'state': task.state,
            'state_code': task.state_code,
            'year': task.year,
            'deaths': task.deaths,
            'births': task.births,
            'mmr': task.maternal_mortality_ratio,
            'population': task.population
        }
        mmr_us_data.append(item)

    return jsonify(mmr_us_data)


@app.route('/api/ins-us')
def getInsdata():
    tasks = db.session.query(Ins)
    ins_us_data = []

    for task in tasks:
        item = {
            'id': task.id,
            'location': task.location,
            'year': task.year,
            'employer': task.employer,
            'non_group': task.non_group,
            'medicaid': task.medicaid,
            'medicare': task.medicare,
            'military': task.military,
            'uninsured': task.uninsured,
            'total': task.total
        }
        ins_us_data.append(item)

    return jsonify(ins_us_data)


if __name__ == '__main__':
    app.run(debug=True)
