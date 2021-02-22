// Load stuff when document ready
// // Source: https://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        init();
    };
};

// Initialize arrays to hold data
var years = [];
var actual_mmr = [];
var model_pred_mmr = [];

function init() {

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
            // title: "<b>Maternal Mortality Ratio (MMR) 2009 - 2030</b>",
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
        Plotly.newPlot('forecast_graph', data, layout);
    });
    // console.log(years, actual_mmr, model_pred_mmr);
};