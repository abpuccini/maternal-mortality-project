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


class StateHealth(db.Model):
    __tablename__ = 'state_health_rankings'
    __table_args__ = {'extend_existing': True}
    year = db.Column(db.Integer)
    measure_name = db.Column(db.String(255))
    state = db.Column(db.String(255))
    rank = db.Column(db.Integer)
    value = db.Column(db.Float)


class Key(db.Model):
    __tablename__ = 'hwc_key'
    measure_name = db.Column(db.String(255), primary_key=True)
    abbreviation = db.Column(db.String(255))
    demographic_breakdown = db.Column(db.String(255))
    source = db.Column(db.String(255))
    source_year = db.Column(db.String(255))


class HWC(db.Model):
    __tablename__ = 'hwc_data'
    state_name = db.Column(db.String(255), primary_key=True)
    ahi_rank = db.Column(db.Float)
    ahi_value = db.Column(db.Float)
    ahi_score = db.Column(db.Float)
    ahi_lower_ci = db.Column(db.Float)
    ahi_upper_ci = db.Column(db.Float)
    ai_rank = db.Column(db.Float)
    ai_value = db.Column(db.Float)
    ai_score = db.Column(db.Float)
    ai_lower_ci = db.Column(db.Float)
    ai_upper_ci = db.Column(db.Float)
    apc_rank = db.Column(db.Float)
    apc_value = db.Column(db.Float)
    apc_score = db.Column(db.Float)
    apc_lower_ci = db.Column(db.Float)
    apc_upper_ci = db.Column(db.Float)
    ac_rank = db.Column(db.Float)
    ac_value = db.Column(db.Float)
    ac_score = db.Column(db.Float)
    ac_lower_ci = db.Column(db.Float)
    ac_upper_ci = db.Column(db.Float)
    dhcp_rank = db.Column(db.Float)
    dhcp_value = db.Column(db.Float)
    dhcp_score = db.Column(db.Float)
    dhcp_lower_ci = db.Column(db.Float)
    dhcp_upper_ci = db.Column(db.Float)
    ds_rank = db.Column(db.Float)
    ds_value = db.Column(db.Float)
    ds_score = db.Column(db.Float)
    ds_lower_ci = db.Column(db.Float)
    ds_upper_ci = db.Column(db.Float)
    mpinc_rank = db.Column(db.Float)
    mpinc_value = db.Column(db.Float)
    mpinc_score = db.Column(db.Float)
    mpinc_lower_ci = db.Column(db.Float)
    mpinc_upper_ci = db.Column(db.Float)
    mow_rank = db.Column(db.Float)
    mow_value = db.Column(db.Float)
    mow_score = db.Column(db.Float)
    mow_lower_ci = db.Column(db.Float)
    mow_upper_ci = db.Column(db.Float)
    pw_rank = db.Column(db.Float)
    pw_value = db.Column(db.Float)
    pw_score = db.Column(db.Float)
    pw_lower_ci = db.Column(db.Float)
    pw_upper_ci = db.Column(db.Float)
    ow_rank = db.Column(db.Float)
    ow_value = db.Column(db.Float)
    ow_score = db.Column(db.Float)
    ow_lower_ci = db.Column(db.Float)
    ow_upper_ci = db.Column(db.Float)
    ppv_rank = db.Column(db.Float)
    ppv_value = db.Column(db.Float)
    ppv_score = db.Column(db.Float)
    ppv_lower_ci = db.Column(db.Float)
    ppv_upper_ci = db.Column(db.Float)
    pctt_rank = db.Column(db.Float)
    pctt_value = db.Column(db.Float)
    pctt_score = db.Column(db.Float)
    pctt_lower_ci = db.Column(db.Float)
    pctt_upper_ci = db.Column(db.Float)
    pfhs_rank = db.Column(db.Float)
    pfhs_value = db.Column(db.Float)
    pfhs_score = db.Column(db.Float)
    pfhs_lower_ci = db.Column(db.Float)
    pfhs_upper_ci = db.Column(db.Float)
    rpa_rank = db.Column(db.Float)
    rpa_value = db.Column(db.Float)
    rpa_score = db.Column(db.Float)
    rpa_lower_ci = db.Column(db.Float)
    rpa_upper_ci = db.Column(db.Float)
    uw_rank = db.Column(db.Float)
    uw_value = db.Column(db.Float)
    uw_score = db.Column(db.Float)
    uw_lower_ci = db.Column(db.Float)
    uw_upper_ci = db.Column(db.Float)
    wwv_rank = db.Column(db.Float)
    wwv_value = db.Column(db.Float)
    wwv_score = db.Column(db.Float)
    wwv_lower_ci = db.Column(db.Float)
    wwv_upper_ci = db.Column(db.Float)
    wic_rank = db.Column(db.Float)
    wic_value = db.Column(db.Float)
    wic_score = db.Column(db.Float)
    wic_lower_ci = db.Column(db.Float)
    wic_upper_ci = db.Column(db.Float)


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


@app.route('/api/state-health-rank')
def getStateHealthRank():
    tasks = db.session.query(StateHealth)
    state_health_rankings = []

    for task in tasks:
        item = {
            'record_id': task.id,
            'year': task.year,
            'measure_name': task.measure_name,
            'state': task.state,
            'rank': task.rank,
            'value': task.value
        }
        state_health_rankings.append(item)

    return jsonify(state_health_rankings)


@app.route('/api/hwc-key')
def getHWCkey():
    tasks = db.session.query(Key)
    key_hwc_data = []

    for task in tasks:
        item = {
            'measure_name': task.measure_name,
            'abbreviation': task.abbreviation,
            'demographic_breakdown': task.demographic_breakdown,
            'source': task.source,
            'source_year': task.source_year
        }
        key_hwc_data.append(item)

    return jsonify(key_hwc_data)


@app.route('/api/hwc')
def getHWCdata():
    tasks = db.session.query(HWC)
    hwc_data = []

    for task in tasks:
        item = {
            'state': task.state_name,
            'ahi': {
                'rank': task.ahi_rank,
                'value': task.ahi_value,
                'score': task.ahi_score,
                'lower_ci': task.ahi_lower_ci,
                'upper_ci': task.ahi_upper_ci
            },
            'ai': {
                'rank': task.ai_rank,
                'value': task.ai_value,
                'score': task.ai_score,
                'lower_ci': task.ai_lower_ci,
                'upper_ci': task.ai_upper_ci
            },
            'apc': {
                'rank': task.apc_rank,
                'value': task.apc_value,
                'score': task.apc_score,
                'lower_ci': task.apc_lower_ci,
                'upper_ci': task.apc_upper_ci
            },
            'ac': {
                'rank': task.ac_rank,
                'value': task.ac_value,
                'score': task.ac_score,
                'lower_ci': task.ac_lower_ci,
                'upper_ci': task.ac_upper_ci
            },
            'dhcp': {
                'rank': task.dhcp_rank,
                'value': task.dhcp_value,
                'score': task.dhcp_score,
                'lower_ci': task.dhcp_lower_ci,
                'upper_ci': task.dhcp_upper_ci
            },
            'ds': {
                'rank': task.ds_rank,
                'value': task.ds_value,
                'score': task.ds_score,
                'lower_ci': task.ds_lower_ci,
                'upper_ci': task.ds_upper_ci
            },
            'mpinc': {
                'rank': task.mpinc_rank,
                'value': task.mpinc_value,
                'score': task.mpinc_score,
                'lower_ci': task.mpinc_lower_ci,
                'upper_ci': task.mpinc_upper_ci
            },
            'mow': {
                'rank': task.mow_rank,
                'value': task.mow_value,
                'score': task.mow_score,
                'lower_ci': task.mow_lower_ci,
                'upper_ci': task.mow_upper_ci
            },
            'pw': {
                'rank': task.pw_rank,
                'value': task.pw_value,
                'score': task.pw_score,
                'lower_ci': task.pw_lower_ci,
                'upper_ci': task.pw_upper_ci
            },
            'ow': {
                'rank': task.ow_rank,
                'value': task.ow_value,
                'score': task.ow_score,
                'lower_ci': task.ow_lower_ci,
                'upper_ci': task.ow_upper_ci
            },
            'ppv': {
                'rank': task.ppv_rank,
                'value': task.ppv_value,
                'score': task.ppv_score,
                'lower_ci': task.ppv_lower_ci,
                'upper_ci': task.ppv_upper_ci
            },
            'pctt': {
                'rank': task.pctt_rank,
                'value': task.pctt_value,
                'score': task.pctt_score,
                'lower_ci': task.pctt_lower_ci,
                'upper_ci': task.pctt_upper_ci
            },
            'pfhs': {
                'rank': task.pfhs_rank,
                'value': task.pfhs_value,
                'score': task.pfhs_score,
                'lower_ci': task.pfhs_lower_ci,
                'upper_ci': task.pfhs_upper_ci
            },
            'rpa': {
                'rank': task.rpa_rank,
                'value': task.rpa_value,
                'score': task.rpa_score,
                'lower_ci': task.rpa_lower_ci,
                'upper_ci': task.rpa_upper_ci
            },
            'uw': {
                'rank': task.uw_rank,
                'value': task.uw_value,
                'score': task.uw_score,
                'lower_ci': task.uw_lower_ci,
                'upper_ci': task.uw_upper_ci
            },
            'wwv': {
                'rank': task.wwv_rank,
                'value': task.wwv_value,
                'score': task.wwv_score,
                'lower_ci': task.wwv_lower_ci,
                'upper_ci': task.wwv_upper_ci
            },
            'wic': {
                'rank': task.wic_rank,
                'value': task.wic_value,
                'score': task.wic_score,
                'lower_ci': task.wic_lower_ci,
                'upper_ci': task.wic_upper_ci
            }
        }
        hwc_data.append(item)

    return jsonify(hwc_data)


if __name__ == '__main__':
    app.run(debug=True)
