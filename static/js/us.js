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
            state1Chart();
            usMap();
        });
    });
};

// Call init() function to render the page
init();

// function to render charts upon a selection from dropdown
function optionChanged(state) {
    console.log(state);
    buildPlot(state);
    insChart(state);
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

// building charts for four selected states

function state1Chart(state) {
    var filterData = insData.filter(item => item.location === "North Carolina");
        var medicaidData = [];
        var uninsuredData = [];
        var yearData = [];
        filterData.forEach(item => {
            medicaid = item.medicaid;
            uninsured = item.uninsured;
            year = item.year;
    
            medicaidData.push(medicaid);
            uninsuredData.push(uninsured);
            yearData.push(year);
        }); 

    //MMR data for specific states in 2019    
    var filterMMRData = usData.filter(event =>
        (event.year === 2019 &&  event.state === "North Carolina") ||
        (event.year === 2019 && event.state === "South Carolina") ||
        (event.year === 2019 && event.state === "Georgia") ||
        (event.year === 2019 && event.state === "Florida") ||
        (event.year === 2019 && event.state === "Alabama") ||
        (event.year === 2019 && event.state === "Mississippi") ||
        (event.year === 2019 && event.state === "Tennessee") ||
        (event.year === 2019 && event.state === "Texas") ||
        (event.year === 2019 && event.state === "Kansas") ||
        (event.year === 2019 && event.state === "South Dakota") ||
        (event.year === 2019 && event.state === "Wisconsin") ||
        (event.year === 2019 && event.state === "Wyoming")
        );
    var mmrData = [];
    var mmrStates = [];
    //var yearMMRData = [];
    filterMMRData.forEach(item => {
        mmr = item.mmr;
        state = item.state;
        //year = item.year;
        mmrData.push(mmr);
        mmrStates.push(mmr);
        //yearMMRData.push(year);
        }); 
        
    console.log(filterMMRData);    
    
    // building the chart traces    
    var trace1 = {
        x: mmrStates, 
        y: mmrData,
        mode: "markers",
        marker: {
            size: mmrData.map(mmr => mmr * 2),
        },
        type: "scatter"
    } 

    // var trace2 = {
    //     x: yearData,
    //     y: medicaidData,
    //     name: "Medicaid",
    //     type: "scatter",
    // }
    
    var data = [trace1];

    var layout = {
        title: "<b>2019 Maternal Mortality Ratio Among States<br>with No Medicaid Expansion",
        yaxis: {
            title: "<b>MMR</b>",
        },
        //xaxis: {
        //     title: "<b>Year</b>",
        //     type: "date"
        // },
    };

    Plotly.newPlot("state1", data, layout, { displayModeBar: false });
};

state1Chart();


// US map 
function usMap() {
    var mapSeries;
    var mapChart;
    var tableCharts;
    var dataSet;
    var tableChart;
    var populationChart;
    var areaChart;
    var houseSeatsChart;

anychart.onDocumentReady(function () {
  // The data used in this sample can be obtained from the CDN
  // https://cdn.anychart.com/samples/maps-in-dashboard/states-of-united-states-dashboard-with-multi-select/data.json
  anychart.data.loadJsonFile(
    'https://cdn.anychart.com/samples/maps-in-dashboard/states-of-united-states-dashboard-with-multi-select/data.json',
    function (data) {
      // pre-processing of the data
      for (var i = 0; i < data.length; i++) {
        data[i].value = new Date(data[i].statehood).getUTCFullYear();
        data[i].short = data[i].id;
      }
      dataSet = anychart.data.set(data);
      tableChart = getTableChart();
      mapChart = drawMap();
      tableCharts = getTableCharts();

      // Setting layout table
      var layoutTable = anychart.standalones.table();
      layoutTable.cellBorder(null);
      layoutTable.container('container');
      layoutTable.draw();

      function getTableChart() {
        var table = anychart.standalones.table();
        table.cellBorder(null);
        table.fontSize(11).vAlign('middle').fontColor('#212121');
        table
          .getCell(0, 0)
          .colSpan(8)
          .fontSize(14)
          .vAlign('bottom')
          .border()
          .bottom('1px #dedede')
          .fontColor('#7c868e');
        table
          .useHtml(true)
          .contents([
            ['Selected States Data'],
            [
              null,
              'Name',
              'Capital',
              'Largest<br/>City',
              'State<br/>Since',
              'Population',
              'Area',
              'House<br/>Seats'
            ],
            [null]
          ]);
        table
          .getRow(1)
          .cellBorder()
          .bottom('2px #dedede')
          .fontColor('#7c868e');
        table.getRow(0).height(45).hAlign('center');
        table.getRow(1).height(35);
        table.getCol(0).width(25);
        table.getCol(1).hAlign('left');
        table.getCol(2).hAlign('left');
        table.getCol(3).hAlign('left');
        table.getCol(2).width(50);
        table.getCol(4).width(50);
        table.getCol(5).width(50);
        return table;
      }

      function solidChart(value) {
        var gauge = anychart.gauges.circular();
        gauge.data([value, 100]);
        gauge.padding(5);
        gauge.margin(0);
        var axis = gauge.axis().radius(100).width(1).fill(null);
        axis
          .scale()
          .minimum(0)
          .maximum(100)
          .ticks({ interval: 1 })
          .minorTicks({ interval: 1 });
        axis.labels().enabled(false);
        axis.ticks().enabled(false);
        axis.minorTicks().enabled(false);

        var stroke = '1 #e5e4e4';
        gauge
          .bar(0)
          .dataIndex(0)
          .radius(80)
          .width(40)
          .fill('#64b5f6')
          .stroke(null)
          .zIndex(5);
        gauge
          .bar(1)
          .dataIndex(1)
          .radius(80)
          .width(40)
          .fill('#F5F4F4')
          .stroke(stroke)
          .zIndex(4);
        gauge
          .label()
          .width('50%')
          .height('25%')
          .adjustFontSize(true)
          .hAlign('center')
          .anchor('center');
        gauge
          .label()
          .hAlign('center')
          .anchor('center')
          .padding(5, 10)
          .zIndex(1);
        gauge.background().enabled(false);
        gauge.fill(null);
        gauge.stroke(null);
        return gauge;
      }

      function getTableCharts() {
        var table = anychart.standalones.table(2, 3);
        table.cellBorder(null);
        table.getRow(0).height(45);
        table.getRow(1).height(25);
        table.fontSize(11).useHtml(true).hAlign('center');
        table
          .getCell(0, 0)
          .colSpan(3)
          .fontSize(14)
          .vAlign('bottom')
          .border()
          .bottom('1px #dedede');
        table.getRow(1).cellBorder().bottom('2px #dedede');
        populationChart = solidChart(0);
        areaChart = solidChart(0);
        houseSeatsChart = solidChart(0);
        table.contents([
          ['Percentage of Total'],
          ['Population', 'Land Area', 'House Seats'],
          [populationChart, areaChart, houseSeatsChart]
        ]);
        return table;
      }

      function changeContent(ids) {
        var i;
        var contents = [
          ['List of Selected States'],
          [
            null,
            'Name',
            'State<br/>Since',
            'Population',
            'Water<br/>Area',
            'House<br/>Seats'
          ]
        ];
        var population = 0;
        var area = 0;
        var seats = 0;
        for (i = 0; i < ids.length; i++) {
          var data = getDataId(ids[i]);
          population += parseInt(data.population);
          area += parseInt(data.area);
          seats += parseInt(data.house_seats);

          var label = anychart.standalones.label();
          label
            .width('100%')
            .height('100%')
            .text('')
            .background()
            .enabled(true)
            .fill({
              src: data.flag,
              mode: 'fit'
            });
          contents.push([
            label,
            data.name,
            data.value,
            parseInt(data.population).toLocaleString(),
            Math.round(
              (parseInt(data.water_area) * 100) /
              (parseInt(data.water_area) + parseInt(data.land_area))
            ) + '%',
            data.house_seats
          ]);
        }

        populationChart.data([
          ((population * 100) / getDataSum('population')).toFixed(2),
          100
        ]);
        populationChart
          .label()
          .text(
            ((population * 100) / getDataSum('population')).toFixed(2) +
            '%'
          );

        areaChart.data([
          ((area * 100) / getDataSum('area')).toFixed(2),
          100
        ]);
        areaChart
          .label()
          .text(((area * 100) / getDataSum('area')).toFixed(2) + '%');

        houseSeatsChart.data([
          ((seats * 100) / getDataSum('house_seats')).toFixed(2),
          100
        ]);
        houseSeatsChart
          .label()
          .text(
            ((seats * 100) / getDataSum('house_seats')).toFixed(2) + '%'
          );

        tableChart.contents(contents);
        for (i = 0; i < ids.length; i++) {
          tableChart.getRow(i + 2).maxHeight(35);
        }
      }

      function drawMap() {
        var map = anychart.map();
        // set map title settings using html
        map.title().padding(10, 0, 10, 0).margin(0).useHtml(true);
        map.title(
          'US States<br/>by the Year of Joining the Union' +
          '<br/><span style="color:#212121; font-size: 11px;">Pick your state or a time period to see when chosen states joined</span>'
        );
        map.padding([0, 0, 10, 0]);
        var credits = map.credits();
        credits.enabled(true);
        credits.url(
          'https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States'
        );
        credits.text(
          'Data source: https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States'
        );
        credits.logoSrc(
          'https://en.wikipedia.org/static/favicon/wikipedia.ico'
        );

        // set map Geo data
        map.geoData('anychart.maps.united_states_of_america');

        map.listen('pointsSelect', function (e) {
          var selected = [];
          var selectedPoints = e.seriesStatus[0].points;
          for (var i = 0; i < selectedPoints.length; i++) {
            selected.push(selectedPoints[i].id);
          }
          changeContent(selected);
        });

        mapSeries = map.choropleth(dataSet);
        mapSeries.labels(null);
        mapSeries.tooltip().useHtml(true);
        mapSeries.tooltip().title().useHtml(true);
        mapSeries.tooltip().titleFormat(function () {
          var data = getDataId(this.id);
          return (
            this.name +
            '<span style="font-size: 10px"> (since ' +
            data.statehood +
            ')</span>'
          );
        });
        mapSeries.tooltip().format(function () {
          var data = getDataId(this.id);
          return (
            '<span style="font-size: 12px; color: #b7b7b7">Capital: </span>' +
            data.capital +
            '<br/>' +
            '<span style="font-size: 12px; color: #b7b7b7">Largest City: </span>' +
            data.largest_city
          );
        });
        var scale = anychart.scales.ordinalColor([
          { less: 1790 },
          { from: 1790, to: 1800 },
          { from: 1800, to: 1820 },
          { from: 1820, to: 1850 },
          { from: 1850, to: 1875 },
          { from: 1875, to: 1900 },
          { greater: 1900 }
        ]);
        scale.colors([
          '#81d4fa',
          '#4fc3f7',
          '#29b6f6',
          '#039be5',
          '#0288d1',
          '#0277bd',
          '#01579b'
        ]);
        mapSeries.hovered().fill('#f06292');
        mapSeries
          .selected()
          .fill('#c2185b')
          .stroke(anychart.color.darken('#c2185b'));
        mapSeries.colorScale(scale);

        mapSeries.stroke(function () {
          this.iterator.select(this.index);
          var pointValue = this.iterator.get(this.referenceValueNames[1]);
          var color = this.colorScale.valueToColor(pointValue);
          return anychart.color.darken(color);
        });

        var colorRange = map.colorRange();
        colorRange.enabled(true);
        colorRange
          .ticks()
          .stroke('3 #ffffff')
          .position('center')
          .length(20)
          .enabled(true);
        colorRange.colorLineSize(5);
        colorRange
          .labels()
          .fontSize(11)
          .padding(0, 0, 0, 0)
          .format(function () {
            var range = this.colorRange;
            var name;
            if (isFinite(range.start + range.end)) {
              name = range.start + ' - ' + range.end;
            } else if (isFinite(range.start)) {
              name = 'After ' + range.start;
            } else {
              name = 'Before ' + range.end;
            }
            return name;
          });
        return map;
      }

      // Creates general layout table with two inside layout tables
      function fillInMainTable(flag) {
        if (flag === 'wide') {
          layoutTable.contents(
            [
              [mapChart, tableCharts],
              [null, tableChart]
            ],
            true
          );
          layoutTable.getCell(0, 0).rowSpan(2);
          layoutTable.getRow(0).height(null);
          layoutTable.getRow(1).height(null);
        } else {
          layoutTable.contents(
            [[mapChart], [tableCharts], [tableChart]],
            true
          );
          layoutTable.getRow(0).height(350);
          layoutTable.getRow(1).height(200);
          layoutTable.getRow(2).height(250);
        }
        layoutTable.draw();
      }

      if (window.innerWidth > 768) fillInMainTable('wide');
      else {
        fillInMainTable('slim');
      }
      mapSeries.select(12);
      mapSeries.select(13);
      mapSeries.select(14);
      mapSeries.select(16);
      changeContent(['US.IN', 'US.KY', 'US.IL', 'US.IA']);

      // On resize changing layout to mobile version or conversely
      window.onresize = function () {
        if (layoutTable.colsCount() === 1 && window.innerWidth > 767) {
          fillInMainTable('wide');
        } else if (
          layoutTable.colsCount() === 2 &&
          window.innerWidth <= 767
        ) {
          fillInMainTable('slim');
        }
      };

      function getDataId(id) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].id === id) return data[i];
        }
      }

      function getDataSum(field) {
        var result = 0;
        for (var i = 0; i < data.length; i++) {
          result += parseInt(data[i][field]);
        }
        return result;
      }
    }
  );
});
}