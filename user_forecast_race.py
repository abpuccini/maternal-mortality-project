# Dependencies
from joblib import load
import pandas as pd
import numpy as np


def forecast_graph_race(asian, black, white, hispanic_origin, not_hispanic_origin):

    # Samples
    data = pd.read_csv(
        "machine_learning/Resources/race_population.csv")
    pop_data = data[['population_by_race']]

    if asian == 1:
        data_asian = data.loc[data['race'] == "Asian or Pacific Islander"]

    pop_data["race_Asian or Pacific Islander"] = asian
    pop_data["race_Black or African American"] = black
    pop_data["race_White"] = white
    pop_data["hispanic_origin_Hispanic or Latino"] = hispanic_origin
    pop_data["hispanic_origin_Not Hispanic or Latino"] = not_hispanic_origin

    race_data = pop_data[["race_Asian or Pacific Islander", "race_Black or African American",
                          "race_White", "hispanic_origin_Hispanic or Latino",
                          "hispanic_origin_Not Hispanic or Latino",
                          "population_by_race"]]

    # input data to predict MMR
    inputValue = np.array(health_data).reshape(1, -1)

    # load the saved pipleine model
    pipeline = load(
        "machine_learning/models/Linear_Regression_strat_by_race_model_no_scale_Lee.sav")

    # predict on the sample data
    predicted_mmr_list = pipeline.predict(inputValue)
    predicted_mmr = predicted_mmr_list[0][0]

    return predicted_mmr
