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
        insChart(selection.property("value"));
    });
};

// Call init() function to render the page
init();

function optionChanged(state) {
    buildPlot(state);
    insChart(state);
};


var usData = [];

d3.json("/api/mmr-us").then(function(data){
    usData = data;
});   

function buildPlot(state) {
        var filterData = usData.filter(event => event.state === state);
        var mmrData = [];
        var yearData = [];
        var birthData = [];
        var deathData = [];
        filterData.forEach(item => {
            mmr = item.mmr;
            year = item.year;
            birth = item.births;
            death = item.deaths;
            mmrData.push(mmr);
            yearData.push(year);
            birthData.push(birth);
            deathData.push(death);
        });

        var trace = {
            x: yearData, 
            y: mmrData,
            //text: birthData,
            //text: `<b>Births: ${birthData}</b>`
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

// function buildChart() {
//     d3.json("/api/ins-us").then(function(data){
//         //console.log(data);
//     }
// )};

// buildChart();

var insData = [];

d3.json("/api/ins-us").then(function(data){
    insData = data;
    console.log(insData);
});  

function insChart(state) {
    var filterData = insData.filter(choice => 
        choice.state === state);
    var employerData = [];
    var medicaidData = [];
    var medicareData = [];
    var militaryData = [];
    var nonGroupData = [];
    var uninsuredData = [];
    var yearData = [];
    filterData.forEach(item => {
        employer = item.employer;
        medicaid = item.medicaid;
        medicare = item.medicare;
        military = item.military;
        nonGroup = item.non_group;
        uninsured = item.uninsured; 
        year = item.year;
        employerData.push(employer);
        medicaidData.push(medicaid);
        medicareData.push(medicare);
        militaryData.push(military);
        nonGroupData.push(non_group);
        uninsuredData.push(uninsured);
        yearData.push(yearData);    
    });

    var trace2 = {
        x: yearData, 
        y: employerData,
        mode: "markers"
    };

    var data = [trace2];

    var layout = {
        title: `<b>${state} Insurance Coverage`,
        yaxis: {
            title: "<b>Health Insurance Coverage<br>Females 19-64</b><br>(Percentage)"
        },
        xaxis: {
            title: "<b>Year</b>",
            type: "date"
        },

    };

    Plotly.newPlot("insChart", data, layout);
};

// insChart();