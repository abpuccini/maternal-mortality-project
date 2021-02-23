// Load stuff when document ready
// // Source: https://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        non_race_graph();
        race_graph();
    };
};

// Initialize arrays to hold data
var years = [];
var actual_mmr = [];
var model_pred_mmr = [];

function non_race_graph() {

    d3.json('/api/forecast-non-race-data').then(function (forecast_data) {
        // console.log(data);
        // Get forecast data
        forecast_data.forEach(item => {
            year = item.year;
            pred_mmr = item.maternal_mortality_ratio;
            m_pred_mmr = item.mmr_prediction;
            years.push(year);
            actual_mmr.push(pred_mmr);
            model_pred_mmr.push(m_pred_mmr);
        });
        // Create Graph
        var act_mmr = {
            x: years,
            y: actual_mmr,
            type: 'scatter',
            name: 'Time-Series MMR',
            mode: 'lines+markers',
            line: {
                color: 'rgb(229, 152, 102)',
                size: 12
            }
        };

        var predic_mmr = {
            x: years,
            y: model_pred_mmr,
            type: 'scatter',
            name: 'LR Model Predicted MMR',
            mode: 'lines+markers',
            line: {
                color: 'rgb(145, 188, 148)',
                size: 12
            }
        };


        var data = [act_mmr, predic_mmr];

        var layout = {
            title: "<b>MMR 2009 - 2030: All Race and Ethnicity</b>",
            yaxis: {
                title: "<b>MMR</b>"
            },
            xaxis: {
                tickvals: years,
                tickangle: 45,
                ticktext: years.map(year => "<b>" + year + "</b>"),
            },
            // https://stackoverflow.com/questions/42133372/how-to-create-a-horizontal-threshold-line-in-plotly-js
            shapes: [
                {
                    type: 'line',
                    yref: 'paper',
                    x0: "2020",
                    y0: 0,
                    x1: "2020",
                    y1: 1,
                    line: {
                        color: 'rgb(255, 0, 0)',
                        width: 1,
                        dash: 'dot'
                    },
                }]
        };
        Plotly.newPlot('forecast_graph_non_race', data, layout);
    });
    // console.log(years, actual_mmr, model_pred_mmr);
};

// Initialize arrays to hold data
var race_year = [];
var white_mmr = [];
var black_mmr = [];
var asian_mmr = [];
var hispanic_mmr = [];

function race_graph() {

    d3.json('/api/forecast-race-data').then(function (data) {
        // console.log(data);

        // Get forecast data
        data.forEach(item => {
            year = item.year;
            white = item.mmr_white;
            black = item.mmr_black;
            asian = item.mmr_asian_islander;
            hispanic = item.mmr_hispanic_origin;
            race_year.push(year);
            white_mmr.push(white);
            black_mmr.push(black);
            asian_mmr.push(asian);
            hispanic_mmr.push(hispanic);
        });
        // Create Graph
        var white = {
            x: race_year,
            y: white_mmr,
            type: 'scatter',
            name: 'White',
            mode: 'lines+markers',
            line: {
                color: 'rgb(138, 186, 172)',
                size: 12
            }
        };

        var black = {
            x: years,
            y: black_mmr,
            type: 'scatter',
            name: 'Black or African American',
            mode: 'lines+markers',
            line: {
                color: 'rgb(108, 55, 36)',
                size: 12
            }
        };

        var asian = {
            x: years,
            y: asian_mmr,
            type: 'scatter',
            name: 'Asian or Pacific Islander',
            mode: 'lines+markers',
            line: {
                color: 'rgb(203, 163, 53)',
                size: 12
            }
        };

        var hispanic = {
            x: years,
            y: hispanic_mmr,
            type: 'scatter',
            name: 'Hispanic or Latino',
            mode: 'lines+markers',
            line: {
                color: 'rgb(199, 85, 104)',
                size: 12
            }
        };

        var data = [black, white, asian, hispanic];

        var layout = {
            title: "<b>MMR 2009 - 2030: Race and Ethnicity</b>",
            yaxis: {
                title: "<b>MMR</b>"
            },
            xaxis: {
                tickvals: race_year,
                tickangle: 45,
                ticktext: race_year.map(year => "<b>" + year + "</b>"),
            },
            // https://stackoverflow.com/questions/42133372/how-to-create-a-horizontal-threshold-line-in-plotly-js
            shapes: [
                {
                    type: 'line',
                    yref: 'paper',
                    x0: "2020",
                    y0: 0,
                    x1: "2020",
                    y1: 1,
                    line: {
                        color: 'rgb(255, 0, 0)',
                        width: 1,
                        dash: 'dot'
                    },
                }]
        };
        Plotly.newPlot('forecast_graph_race', data, layout);
    });
};