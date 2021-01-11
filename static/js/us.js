// Initialize arrays to hold data
var states = [];
var years = [];
var usData = [];
var insData = [];

// Function to call data when the webpage loads
function init() {
  // Append options for users to select based on ids
  d3.json("/api/ins-us").then(function (ins) {
    d3.json("/api/mmr-us").then(function (data) {
      usData = data;
      insData = ins
      // console.log(insData);

      var filterState = ins.filter(event => event.year === 2009);
      filterState.forEach(element => {
        state = element.location;
        states.push(state);
      });
      var filterYear = ins.filter(event => event.location === "California");
      filterYear.forEach(element => {
        year = element.year;
        years.push(year);
      })

      var selection = d3.select("#selDataset");

      states.forEach(item => {
        var options = selection.append("option");
        options.property("value", item);
        options.text(item);
      });

      var selection2 = d3.select("#selYear")

      years.forEach(item => {
        var options2 = selection2.append("option");
        options2.property("value", item);
        options2.text(item);
      });


      buildPlot(selection.property("value"));
      insChart(selection.property("value"));
      state1Chart(selection2.property("value"));
    });
  });
};

// Call init() function to render the page
init();

//function to render charts upon a selection from dropdown
function optionChanged(state) {
    // console.log(state);
    buildPlot(state);
    insChart(state);
};

function yearChanged(year) {
  state1Chart(year);
};

// building first plot for MMR data
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
// console.log(yearData);
  var trace = {
    x: yearData,
    y: mmrData,
    name: "MMR",
    type: "line",
    mode: "lines+markers",
    line: {
      color: 'rgb(210, 105, 30)',
    }
  };

  var data = [trace];

  var layout = {
    title: `<b>${state} Maternal Mortality Ratio</b>`,
    yaxis: {
      title: "<b>MMR</b>"
    },
    xaxis: {
      title: "<b>Year</b>",
      type: "date",
      tickvals: years,
      ticktext: ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
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

// building chart for insurance data
function insChart(state) {
  var filterData = insData.filter(choice =>
    choice.location === state);
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
// console.log(yearData);

  var trace3 = {
    x: yearData,
    y: medicaidData,
    name: "Medicaid",
    type: "scatter",
    mode: "lines+markers",
    line: {
      color: 'rgb(60, 179, 113)',
    }
  }

  var trace6 = {
    x: yearData,
    y: uninsuredData,
    name: "Uninsured",
    type: "scatter",
    mode: "lines+markers",
    line: {
      color: 'rgb(25, 25, 112)',
    }
  }

  var data = [trace3, trace6];

  var layout = {
    title: `<b>${state} Health Insurance Coverage<br>Females 19-64</b>`,
    yaxis: {
      title: "<b>Percentage</b>",
    },
    xaxis: {
      title: "<b>Year</b>",
      type: "date",
      tickvals: years,
      ticktext: ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
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

// Source (researched by AB Puccini): https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
// Random color
function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
};

// bubble chart for states that haven't expanded Medicaid
function state1Chart(year) {
  year = parseInt(year);
  console.log(year);
  //MMR data for specific states
  var filterMMRData = usData.filter(event =>
    (event.year === year && event.state === "North Carolina") ||
    (event.year === year && event.state === "South Carolina") ||
    (event.year === year && event.state === "Georgia") ||
    (event.year === year && event.state === "Florida") ||
    (event.year === year && event.state === "Alabama") ||
    (event.year === year && event.state === "Mississippi") ||
    (event.year === year && event.state === "Tennessee") ||
    (event.year === year && event.state === "Texas") ||
    (event.year === year && event.state === "Kansas") ||
    (event.year === year && event.state === "South Dakota") ||
    (event.year === year && event.state === "Wisconsin") ||
    (event.year === year && event.state === "Wyoming")
  );

  var mmrData = [];
  var mmrStates = [];
  var textList = [];

  filterMMRData.forEach(item => {
    mmr = item.mmr;
    state = item.state;
    textHover = `State: ${state} <br> MMR: ${mmr}`
    mmrData.push(mmr);
    mmrStates.push(mmr);
    textList.push(textHover);
  });

  // console.log(mmrData, mmrStates, textList);

  // building the chart traces

  var colors = [];
  for (var i = 0; i < textList.length; i++) {
    var color = random_rgba();
    colors.push(color);
  };

  var trace1 = {
    x: mmrStates,
    y: mmrData,
    mode: "markers",
    marker: {
      size: mmrData.map(mmr => mmr * 2),
      color: colors,
      colorscale: "Earth",
      opacity: mmrData.map(id => 0.7)
    },
    type: "scatter",
    text: textList
  };

  var data = [trace1];

  var layout = {
    title: "<b>Maternal Mortality Ratio Among States<br>With No Medicaid Expansion",
    showlegend: false,
    yaxis: {
      title: "<b>MMR</b>",
    },
  };

  Plotly.newPlot("state1", data, layout, { displayModeBar: false });
};

state1Chart();
