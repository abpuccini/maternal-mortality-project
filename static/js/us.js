// var url = "api/mmr-us"
// var mmrData = "sqlite:///output_file/maternal_mortality.sqlite"

// var result = []; 

// retrieve an array of state names for dropdown menu

// var insData;

// read in the data for states insurance
// d3.json("/api/ins-us").then(function(data){
//     insData = data;
//     console.log(data);
// });

// console.log(insData);

//function for filtering only states for 2009
// function filterStates(state) {
//     d3.json("/api/ins-us").then(function(data){
//     var filterState = data.filter(event => event.year === 2009);
//     return filterState
// }
// );

// filterStates(state);

// var filteredStates =  data.filter(filterStates);

// console.log(filteredStates);

// Initialize arrays to hold data
// var state = [];
// // Function to call data when the webpage loads
// function init() {
//     // Append options for users to select based on state
//     d3.json("/api/ins-us").then(function (data) {
//         // Retrieve data and store it into variables
//         var filterState = data.filter(event => event.year === 2009);
//         console.log(filterState);

//         state = Object.values(filterState.location);
//         console.log(state);
//         // Append the options for users to select
//         var selection = d3.select("#selDataset");
//         state.forEach(element => {
//             var options = selection.append("option");
//             options.property("value", element);
//             options.text(element);
//         });
//         // Call the visualization when the webpage first loads
//         optionChanged(selection.property("value"));
//     });
// }
// // Call init() function to render the page
// init();

// Initialize arrays to hold data
var states = [];
// Function to call data when the webpage loads
function init() {
    // Append options for users to select based on ids
    d3.json("/api/ins-us").then(function (data) {
        var filterState = data.filter(event => event.year === 2009);
        filterState.forEach(element => {
            state = element.location;
            states.push(state);
        });
        var selection = d3.select("#selDataset");

        states.forEach(item => {
            var options = selection.append("option");
            options.property("value", item);
            options.text(item);
        });
        buildPlot(selection.property("value"));
    });
};
// Call init() function to render the page
init();

function optionChanged(state) {
    buildPlot(state);
};


var usData = [];

d3.json("/api/mmr-us").then(function(data){
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
    d3.json("/api/ins-us").then(function(data){
        //console.log(data);
    }
)};

buildChart();
