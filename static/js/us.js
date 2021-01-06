var url = "https://maternal-mortality-project.herokuapp.com/api/mmr-us"

var result = []; 

function buildPlot() {
    d3.json(url).then(function(data){
        console.log(data);
        var state = data.state; 
        var mmr = data.mmr;
        var year = data.year;

        var trace = {
            state: state,
            x: year, 
            y: mmr,
        };

        var data = [trace];

        var layout = {
            title: '${state} Maternal Mortality Ratio'
        };

        Plotly.newPlot("plot", data, layout);
    });
}

buildPlot();
