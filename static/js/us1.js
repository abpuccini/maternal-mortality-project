// Initialize arrays to hold data
var years = [];
// Function to call data when the webpage loads
function init() {
    // Append options for users to select based on ids
    d3.json("/api/state-health-rank").then(function (data) {
        var filterYear = data.filter(event => event.state === "Alaska");
        filterYear.forEach(element => {
            year = element.year;
            years.push(year);
        });
        var selection = d3.select("#selDataset");

        years.forEach(item => {
            var options = selection.append("option");
            options.property("value", item);
            options.text(item);
        });
        buildPlot(selection.property("value"));
    });
};
// Call init() function to render the page
init();

function optionChanged(year) {
    buildPlot(year);
};


var usData = [];

d3.json("/api/state-health-rank").then(function(data){
    usData = data;
});   

function buildPlot(state) {
        var filterData = usData.filter(event => event.state === state);
        var mmrData = [];
        var yearData = [];
        filterData.forEach(item => {
            mmr = item.mmr;
            year = item.year;
            mmrData.push(mmr);
            yearData.push(year);
        });

        var trace = {
            x: yearData, 
            y: mmrData,
        };

        var data = [trace];

        var layout = {
            title: `<b>${state} Maternal Mortality Ratio</b>`,
            yaxis: {
                title: "<b>MMR</b>"
            },
            xaxis: {
                title: "<b>Year</b>",
                type: "date"
            },
        };

        Plotly.newPlot("plot", data, layout);
    };

function buildChart() {
    d3.json("/api/state-health-rank").then(function(data){
        //console.log(data);
    }
)};

buildChart();