// Load stuff when document ready
// Source: https://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        user_forecast_graph();
    };
};

// Initialize arrays to hold data
var mmrUser = [];
var xTick = [];

function user_forecast_graph() {
    // Call data data
    d3.json('/api/user-input').then(function (data) {
        // console.log(data);

        data.forEach(item => {
            year = item.year;
            xTick.push(year);
            mmr = item.mmr;
            mmrUser.push(mmr);
        })
        // console.log(xTick);


        var avg_mmr = {
            x: xTick,
            y: mmrUser,
            mode: 'markers',
            marker: {
                color: mmrUser.map(item => 'rgb(229, 152, 102)'),
                size: 12
            }
        };

        var data = [avg_mmr];

        var layout = {
            title: `<b>Average MMR based on Average Health Outcome</b>`,
            yaxis: {
                title: "<b>Maternal Mortality Ratio</b>"
            },
            xaxis: {
                tickvals: xTick,
                ticktext: ['<b>2009</b>', '<b>2010</b>', '<b>2011</b>', '<b>2012</b>', '<b>2013</b>',
                    '<b>2014</b>', '<b>2015</b>', '<b>2016</b>', '<b>2017</b>', '<b>2018</b>', '<b>2019</b>', "<b>User's Prediction</b>"],
            },
        };

        Plotly.newPlot('user_graph', data, layout);
    });
}