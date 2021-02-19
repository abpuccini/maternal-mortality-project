from flask import Flask, render_template, redirect, jsonify, json, request
from flask_sqlalchemy import SQLAlchemy
from os import environ
import user_forecast


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
    name = db.Column(db.String)
    id = db.Column(db.String, primary_key=True)
    mmr = db.Column(db.Integer)
    ranking = db.Column(db.Integer)
    category = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)


class Causes(db.Model):
    __tablename__ = 'causes_of_deaths'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    region = db.Column(db.String(255))
    abortion = db.Column(db.Integer)
    embolism = db.Column(db.Integer)
    haemorrhage = db.Column(db.Integer)
    hypertension = db.Column(db.Integer)
    sepsis = db.Column(db.Integer)
    other_direct_causes = db.Column(db.Integer)
    indirect_causes = db.Column(db.Integer)


class CDC(db.Model):
    __tablename__ = 'mmr_us'
    record_id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(255))
    id = db.Column(db.Integer)
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
    id = db.Column(db.Integer, primary_key=True)
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
    im_rank = db.Column(db.Float)
    im_value = db.Column(db.Float)
    im_score = db.Column(db.Float)
    im_lower_ci = db.Column(db.Float)
    im_upper_ci = db.Column(db.Float)
    how_rank = db.Column(db.Float)
    how_value = db.Column(db.Float)
    how_score = db.Column(db.Float)
    how_lower_ci = db.Column(db.Float)
    how_upper_ci = db.Column(db.Float)
    mm_rank = db.Column(db.Float)
    mm_value = db.Column(db.Float)
    mm_score = db.Column(db.Float)
    mm_lower_ci = db.Column(db.Float)
    mm_upper_ci = db.Column(db.Float)
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


class Race(db.Model):
    __tablename__ = 'race_data'
    __table_args__ = {'extend_existing': True}
    state = db.Column(db.String(255))
    state_code = db.Column(db.Integer)
    year = db.Column(db.Integer, primary_key=True)
    race = db.Column(db.String(255), primary_key=True)
    hispanic_origin = db.Column(db.String(255), primary_key=True)
    births_by_race = db.Column(db.Integer)
    deaths_by_race = db.Column(db.Integer)
    mmr_by_race = db.Column(db.Float)
    population_by_race = db.Column(db.Integer)
    id = db.Column(db.String(255))
    state_abbv = db.Column(db.String(255), primary_key=True)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)


class NonRace(db.Model):
    __tablename__ = 'non_race_data'
    __table_args__ = {'extend_existing': True}
    year = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(255))
    id = db.Column(db.String(255))
    state_code = db.Column(db.String(255), primary_key=True)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    deaths = db.Column(db.Float)
    births = db.Column(db.Float)
    maternal_mortality_ratio = db.Column(db.Float)
    population = db.Column(db.Float)
    employer = db.Column(db.Float)
    non_group = db.Column(db.Float)
    medicaid = db.Column(db.Float)
    medicare = db.Column(db.Float)
    military = db.Column(db.Float)
    uninsured = db.Column(db.Float)
    air_pollution_val = db.Column(db.Float)
    cancer_death_val = db.Column(db.Float)
    cardio_death_val = db.Column(db.Float)
    child_pov_val = db.Column(db.Float)
    choles_check_val = db.Column(db.Float)
    dent_vis_val = db.Column(db.Float)
    dentists_val = db.Column(db.Float)
    diabetes_val = db.Column(db.Float)
    drug_deaths_val = db.Column(db.Float)
    health_stat_fem_val = db.Column(db.Float)
    immun_child_val = db.Column(db.Float)
    income_ineq_val = db.Column(db.Float)
    infant_mort_val = db.Column(db.Float)
    infect_dis_val = db.Column(db.Float)
    obesity_val = db.Column(db.Float)
    phys_inac_val = db.Column(db.Float)
    prem_death_val = db.Column(db.Float)
    smoking_val = db.Column(db.Float)
    uninsured_val = db.Column(db.Float)
    all_determs_val = db.Column(db.Float)
    all_outcomes_val = db.Column(db.Float)
    chlamydia_val = db.Column(db.Float)
    prem_death_ri_val = db.Column(db.Float)
    teen_birth_val = db.Column(db.Float)
    primary_care_val = db.Column(db.Float)
    low_birthweight_val = db.Column(db.Float)


class Playground(db.Model):
    __tablename__ = 'user_input'
    __table_args__ = {'extend_existing': True}
    year = db.Column(db.String, primary_key=True)
    maternal_mortality_ratio = db.Column(db.Float)

    def __init__(self, year, maternal_mortality_ratio):
        self.year = year
        self.maternal_mortality_ratio = maternal_mortality_ratio


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/united-states-mmr-affordable-care-act')
def us_ins_data():
    return render_template('united-states-mmr-affordable-care-act.html')


@app.route('/united-states-ranked-health-measure-comparison')
def us_ranked_health_measure():
    return render_template('united-states-ranked-health-measure-comparison.html')


@app.route('/machine-learning-model')
def ml_model():
    return render_template('machine-learning-model.html')


@app.route('/machine-learning-forecast')
def ml_forecast():
    return render_template('machine-learning-forecast.html')


@app.route('/machine-learning-playground')
def ml_playground():
    return render_template('machine-learning-playground.html')


@app.route('/methodology')
def methodology():
    return render_template('methodology.html')


@app.route('/news-articles')
def news_articles():
    return render_template('news-articles.html')


@app.route('/about-us')
def about_us():
    return render_template('about-us.html')


@app.route("/api/user-forecast", methods=['GET', 'POST'])
def playgroundForecast():

    tasks = db.session.query(Playground)
    if request.method == 'GET':
        old_predicted_mmr = tasks.filter_by(
            year="user_input").first()
        old_predicted_mmr.maternal_mortality_ratio = float(1.00)
        db.session.commit()

    if request.method == "POST":
        diabetes = request.form['diabetes']
        prem_death = request.form['prem_death']
        phys_inac = request.form['phys_inac']
        low_birthweight = request.form['low_birthweight']
        obesity = request.form['obesity']

        user_predicted_mmr = user_forecast.forecast_graph(
            diabetes, prem_death, phys_inac, low_birthweight, obesity)

        new_predicted_mmr = tasks.filter_by(
            year="user_input")
        new_predicted_mmr.maternal_mortality_ratio = user_predicted_mmr
        db.session.commit()

    return redirect('/machine-learning-playground')


@app.route("/api/user-input")
def userInput():
    tasks = db.session.query(Playground)
    playground_data = []

    for task in tasks:
        item = {
            'year': task.year,
            'mmr': task.maternal_mortality_ratio,
        }
        playground_data.append(item)

    return jsonify(playground_data)


@app.route('/api/mmr-global')
def getGlobaldata():
    tasks = db.session.query(Global)
    mmr_global_data = []

    for task in tasks:
        item = {
            'name': task.name,
            'id': task.id,
            'mmr': task.mmr,
            'ranking': task.ranking,
            'category': task.category,
            'geometry': {
                'lat': task.latitude,
                'lng': task.longitude
            },
        }
        mmr_global_data.append(item)

    return jsonify(mmr_global_data)


@app.route('/api/causes-of-deaths')
def getCausesdata():
    tasks = db.session.query(Causes)
    causes_data = []

    for task in tasks:
        item = {
            'id': task.id,
            'region': task.region,
            'abortion': task.abortion,
            'embolism': task.embolism,
            'haemorrhage': task.haemorrhage,
            'hypertension': task.hypertension,
            'sepsis': task.sepsis,
            'other_direct_causes': task.other_direct_causes,
            'indirect_causes': task.indirect_causes
        }
        causes_data.append(item)

    return jsonify(causes_data)


@app.route('/api/mmr-us')
def getUSdata():
    tasks = db.session.query(CDC)
    mmr_us_data = []

    for task in tasks:
        item = {
            'record_id': task.record_id,
            'state': task.state,
            'id': task.id,
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
            'id': task.id,
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
            'im': {
                'rank': task.im_rank,
                'value': task.im_value,
                'score': task.im_score,
                'lower_ci': task.im_lower_ci,
                'upper_ci': task.im_upper_ci
            },
            'how': {
                'rank': task.how_rank,
                'value': task.how_value,
                'score': task.how_score,
                'lower_ci': task.how_lower_ci,
                'upper_ci': task.how_upper_ci
            },
            'mm': {
                'rank': task.mm_rank,
                'value': task.mm_value,
                'score': task.mm_score,
                'lower_ci': task.mm_lower_ci,
                'upper_ci': task.mm_upper_ci
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


@app.route('/api/race-data')
def getRaceData():
    tasks = db.session.query(Race)
    race_data = []

    for task in tasks:
        item = {
            'state': task.state,
            'state_code': task.state_code,
            'year': task.year,
            'race': task.race,
            'hispanic_origin': task.hispanic_origin,
            'births_by_race': task.births_by_race,
            'deaths_by_race': task.deaths_by_race,
            'mmr_by_race': task.mmr_by_race,
            'population_by_race': task.population_by_race,
            'id': task.id,
            'state_abbv': task.state_abbv,
            'latitude': task.latitude,
            'longitude': task.longitude
        }
        race_data.append(item)

    return jsonify(race_data)


@app.route('/api/non-race-data')
def getNonRaceData():
    tasks = db.session.query(NonRace)
    non_race_data = []

    for task in tasks:
        item = {
            'year': task.year,
            'state': task.state,
            'id': task.id,
            'state_code': task.state_code,
            'latitude': task.latitude,
            'longitude': task.longitude,
            'deaths': task.deaths,
            'births': task.births,
            'maternal_mortality_ratio': task.maternal_mortality_ratio,
            'population': task.population,
            'employer': task.employer,
            'non_group': task.non_group,
            'medicaid': task.medicaid,
            'medicare': task.medicare,
            'military': task.military,
            'uninsured': task.uninsured,
            'air_pollution_val': task.air_pollution_val,
            'cancer_death_val': task.cancer_death_val,
            'cardio_death_val': task.cardio_death_val,
            'child_pov_val': task.child_pov_val,
            'choles_check_val': task.choles_check_val,
            'dent_vis_val': task.dent_vis_val,
            'dentists_val': task.dentists_val,
            'diabetes_val': task.diabetes_val,
            'drug_deaths_val': task.drug_deaths_val,
            'health_stat_fem_val': task.health_stat_fem_val,
            'immun_child_val': task.immun_child_val,
            'income_ineq_val': task.income_ineq_val,
            'infant_mort_val': task.infant_mort_val,
            'infect_dis_val': task.infect_dis_val,
            'obesity_val': task.obesity_val,
            'phys_inac_val': task.phys_inac_val,
            'prem_death_val': task.prem_death_val,
            'smoking_val': task.smoking_val,
            'uninsured_val': task.uninsured_val,
            'all_determs_val': task.all_determs_val,
            'all_outcomes_val': task.all_outcomes_val,
            'chlamydia_val': task.chlamydia_val,
            'prem_death_ri_val': task.prem_death_ri_val,
            'teen_birth_val': task.teen_birth_val,
            'primary_care_val': task.primary_care_val,
            'low_birthweight_val': task.low_birthweight_val
        }
        non_race_data.append(item)

    return jsonify(non_race_data)


if __name__ == '__main__':
    app.run(debug=True)
