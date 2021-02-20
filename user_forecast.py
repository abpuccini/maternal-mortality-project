# Dependencies
from joblib import load
import pandas as pd
import numpy as np


def forecast_graph(diabetes, prem_death, phys_inac, low_birthweight, health_stat_fem):

    # Samples
    data = pd.read_csv(
        "machine_learning/Resources/combined_avg_2009_2019.csv")
    stat_data = data.describe()
    stat_data = stat_data.loc['mean'][['diabetes_val', 'prem_death_val',
                                       'phys_inac_val', 'low_birthweight_val', 'obesity_val',
                                       'cardio_death_val', 'medicare', 'cancer_death_val', 'chlamydia_val',
                                       'child_pov_val', 'smoking_val', 'infant_mort_val', 'income_ineq_val',
                                       'dentists_val', 'prem_death_ri_val', 'dent_vis_val', 'all_outcomes_val',
                                       'all_determs_val', 'health_stat_fem_val']]

    health_data = stat_data.copy()

    health_data['diabetes_val'] = diabetes
    health_data['prem_death_val'] = prem_death
    health_data['phys_inac_val'] = phys_inac
    health_data['low_birthweight_val'] = low_birthweight
    health_data['health_stat_fem_val'] = health_stat_fem

    # input data to predict MMR
    inputValue = np.array(health_data).reshape(1, -1)

    # load the saved pipleine model
    pipeline = load("machine_learning/models/LR_model1_Chahnaz.sav")

    # predict on the sample data
    predicted_mmr_list = pipeline.predict(inputValue)
    predicted_mmr = predicted_mmr_list[0][0]

    return predicted_mmr
