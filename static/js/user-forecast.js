// Initialize user input


// Load stuff when document ready
// // Source: https://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        avg_graph();
    };
};

// Initialize arrays to hold data

var form = d3.select("form");

function avg_graph() {

    // d3.event.preventDefault();

    // Call data data
    d3.json('/api/user-input').then(function (data) {

        var mmrUser = [];
        var xTick = [];

        // console.log(data);

        data.pop()

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
            title: `<b>Average MMR: Average Health Measures</b>`,
            yaxis: {
                title: "<b>MMR</b>"
            },
            xaxis: {
                tickvals: xTick,
                ticktext: ['<b>2009</b>', '<b>2010</b>', '<b>2011</b>', '<b>2012</b>', '<b>2013</b>',
                    '<b>2014</b>', '<b>2015</b>', '<b>2016</b>', '<b>2017</b>', '<b>2018</b>', '<b>2019</b>', "<b>User's Prediction</b>"],
            },
        };
        var config = {responsive: true, displayModeBar: false };
        Plotly.newPlot('user_graph', data, layout, config);
    });
}

form.on("submit", user_forecast_graph);

function user_forecast_graph() {

    d3.event.preventDefault();
    var diabetes = d3.select('#diabetes').property('value')
    var prem_death = d3.select('#prem_death').property('value')
    var phys_inac = d3.select('#phys_inac').property('value')
    var low_birthweight = d3.select('#low_birthweight').property('value')
    var health_stat_fem = d3.select('#health_stat_fem').property('value')

    d3.json('/api/user-forecast', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            diabetes, prem_death, phys_inac, low_birthweight, health_stat_fem
        })
    }).then(data => {
        // console.log(data);

        var user_input_mmr = data;
        // console.log(user_input_mmr);

        // Call data data
        d3.json('/api/user-input').then(function (data) {

            var mmrUser = [];
            var xTick = [];

            // console.log(data);

            data.forEach(item => {
                year = item.year;
                xTick.push(year);
                mmr = item.mmr;
                mmrUser.push(mmr);
            })
            // console.log(xTick);

            mmrUser.pop();
            // console.log(mmrUser);

            mmrUser.push(user_input_mmr);

            // console.log(mmrUser);

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
                title: `<b>Predicted MMR: Health Measures</b>`,
                yaxis: {
                    title: "<b>MMR</b>"
                },
                xaxis: {
                    tickvals: xTick,
                    ticktext: ['<b>2009</b>', '<b>2010</b>', '<b>2011</b>', '<b>2012</b>', '<b>2013</b>',
                        '<b>2014</b>', '<b>2015</b>', '<b>2016</b>', '<b>2017</b>', '<b>2018</b>', '<b>2019</b>', "<b>User's Prediction</b>"],
                },
            };

            var config = {responsive: true, displayModeBar: false };
            Plotly.newPlot('user_graph', data, layout, config);
        });
    })
}


