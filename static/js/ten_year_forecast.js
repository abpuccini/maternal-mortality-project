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
            y: actual_mmr.slice(0, 12),
            type: 'scatter',
            name: 'Average MMR',
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
            name: 'Predicted MMR',
            mode: 'lines+markers',
            line: {
                color: 'rgb(145, 188, 148)',
                size: 12
            }
        };


        var data = [act_mmr, predic_mmr];

        var layout = {
            title: `<b>MMR 10-Year Forecast</b>`,
            yaxis: {
                title: "<b>Maternal Mortality Ratio</b>"
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
                    xref: 'paper',
                    x0: 0,
                    y0: 31.34,
                    x1: 1,
                    y1: 31.34,
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