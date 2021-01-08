// Initialize arrays to hold data
var states = [];
var usData = [];
var insData = [];

// Function to call data when the webpage loads
function init() {
    // Append options for users to select based on ids
    d3.json("/api/ins-us").then(function (ins) {
        d3.json("/api/mmr-us").then(function (data) {
            usData = data;
            insData = ins
            console.log(insData);
            var filterState = ins.filter(event => event.year === 2009);
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
    });
};

// Call init() function to render the page
init();

function optionChanged(state) {
    console.log(state);
    buildPlot(state);
    insChart(state);
};




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
        name: "MMR",
        type: "scatter",
        //range: [0,70],
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
        shapes: [
            {
                type: "line",
                x0: "2014",
                y0: 0,
                x1: "2014",
                y1: 70,
                line: {
                    dash: "dot"
                }

            },
        ]
    };

    Plotly.newPlot("plot", data, layout, { displayModeBar: false });
};

// function buildChart() {
//     d3.json("/api/ins-us").then(function(data){
//         //console.log(data);
//     }
// )};

// buildChart();

// var insData = [];

// d3.json("/api/ins-us").then(function(data){
//     insData = data;
//     console.log(insData);
// });  

function insChart(state) {
    var filterData = insData.filter(choice =>
        choice.location === state);
    console.log(filterData);
    var employerData = [];
    var medicaidData = [];
    var medicareData = [];
    var militaryData = [];
    var nonGroupData = [];
    var uninsuredData = [];
    var yearData = [];
    //filter usData for MMR rate to add to insurance chart
    var filterMMRData = usData.filter(event => event.state === state);
    var mmrData = [];
    filterMMRData.forEach(item => {
        mmr = item.mmr;
        mmrData.push(mmr);
    });

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
        nonGroupData.push(nonGroup);
        uninsuredData.push(uninsured);
        yearData.push(year);
    });
    // missing years for MMR data is problematic for graphing alongside ins Data
    // var trace1 = {
    //     x: yearData, 
    //     y: mmrData,
    //     name: "Maternal Mortality Ratio",
    //     type: "scatter",
    // }

    var trace2 = {
        x: yearData,
        y: employerData,
        name: "Employer Plans",
        // mode: "markers",
        type: "scatter",
    };

    var trace3 = {
        x: yearData,
        y: medicaidData,
        name: "Medicaid",
        type: "scatter",
    }

    var trace4 = {
        x: yearData,
        y: nonGroupData,
        name: "Non-Group Plans",
        type: "scatter",
    }

    var trace5 = {
        x: yearData,
        y: militaryData,
        name: "Military",
        type: "scatter",
    }

    var trace6 = {
        x: yearData,
        y: uninsuredData,
        name: "Uninsured",
        type: "scatter",
    }

    var data = [trace3, trace6];
    console.log(employerData);
    console.log(yearData);

    var layout = {
        title: `<b>${state} Health Insurance Coverage<br>Females 19-64</b>`,
        yaxis: {
            title: "<b>Percentage</b>",
            //range: [1,30],
        },
        xaxis: {
            title: "<b>Year</b>",
            type: "date"
        },
        shapes: [
            {
                type: "line",
                x0: "2014",
                y0: 0,
                x1: "2014",
                y1: 25,
                line: {
                    dash: "dot"
                }

            },
        ]
    };

    Plotly.newPlot("insChart", data, layout, { displayModeBar: false });
};

// insChart();