// Initialize arrays to hold data
var years = [];
var actual_mmr = [];
var model_pred_mmr = [];

function init() {

    // Call data data
    d3.json('/api/non-race-data').then(function (data) {
        data.forEach(item => {
            year = item.year;
            act_mmr = item.maternal_mortality_ratio;
            years.push(year);
            actual_mmr.push(act_mmr);
        });
    })
    d3.json('/api/forecast-non-race-data').then(function (forecast_data) {
        // console.log(data);
        // Get forecast data
        forecast_data.forEach(item => {
            year = item.year;
            pred_mmr = item.mmr_prediction;
            m_pred_mmr = item.maternal_mortality_ratio;
            years.push(year);
            actual_mmr.push(pred_mmr);
            model_pred_mmr.push(m_pred_mmr);
        });
    });
    console.log(years, actual_mmr, model_pred_mmr);

};

init();