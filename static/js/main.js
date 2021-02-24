// Main js linked to index

// Load stuff when document ready
// Source: https://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        GlobalMap();
        bubbleGlobal();
        init();
    };
};

// Global map based on MMR
function GlobalMap() {

    // Source: https://www.anychart.com/products/anymap/gallery/Maps_General_Features/World_Choropleth_Map.php
    anychart.onDocumentReady(function () {
        // The data used in this sample can be obtained from the CDN
        // https://cdn.anychart.com/samples/maps-general-features/world-choropleth-map/data.json
        anychart.data.loadJsonFile(
            "/api/mmr-global",
            function (data) {
                // console.log(data);

                // Create map
                var map = anychart.map();

                // Map title
                map
                    .title()
                    .enabled(true)
                    .useHtml(true)
                    .padding([10, 0, 30, 0])
                    .text(
                        '<b style="color:#696969">Global Maternal Mortality Ratio</b><br/>' +
                        '<span style="color:#929292; font-size: 12px;">Maternal Deaths per 100,000 Live Births<br/>' +
                        '<span  style="color:#929292; font-size: 10px;">(Data Source: UNICEF, 2017)</span>'
                    );

                // Create world map
                map.geoData('anychart.maps.world');
                map.interactivity().selectionMode('none');
                map.padding(0);

                // Set data to plot
                var dataSet = anychart.data.set(data);
                var mmrData = dataSet.mapAs({ value: 'mmr' });
                var series = map.choropleth(mmrData);

                series.labels(false);

                // When user hovers over each country
                series
                    .hovered()
                    .fill('#18618d')
                    .stroke(anychart.color.darken('#18618d'));

                series
                    .selected()
                    .fill('#c2185b')
                    .stroke(anychart.color.darken('#c2185b'));

                series
                    .tooltip()
                    .useHtml(true)
                    .format(function () {
                        return (
                            '<span style="color: #d9d9d9">MMR</span>: ' +
                            parseFloat(this.value).toLocaleString() +
                            '<br/>' +
                            '<span style="color: #d9d9d9">Ranking</span>: ' +
                            parseInt(this.getData('ranking')).toLocaleString() +
                            '<br/>' +
                            '<span style="color: #d9d9d9">Category</span>: ' +
                            this.getData('category')
                        );
                    });

                var scale = anychart.scales.ordinalColor([
                    { less: 10 },
                    { from: 10, to: 20 },
                    { from: 20, to: 40 },
                    { from: 40, to: 60 },
                    { from: 60, to: 90 },
                    { from: 90, to: 150 },
                    { from: 150, to: 250 },
                    { from: 250, to: 350 },
                    { from: 350, to: 450 },
                    { from: 450, to: 600 },
                    { from: 600, to: 800 },
                    { from: 800, to: 1000 },
                    { greater: 1000 }
                ]);
                scale.colors([
                    '#e7e7e1',
                    '#cfcfca',
                    '#fcfcce',
                    '#f6f76c',
                    '#d3f6d3',
                    '#bdddbd',
                    '#bbdefb',
                    '#64b5f6',
                    '#f4c884',
                    '#ea910a',
                    '#f06353',
                    '#ea210a',
                    '#a31707'
                ]);

                var colorRange = map.colorRange();
                colorRange.enabled(true).padding([0, 0, 20, 0]);
                colorRange
                    .ticks()
                    .enabled(true)
                    .stroke('3 #ffffff')
                    .position('center')
                    .length(14);
                colorRange.colorLineSize(5);
                colorRange.marker().size(7);
                colorRange
                    .labels()
                    .fontSize(7)
                    .padding(3, 0, 0, 0)
                    .format(function () {
                        var range = this.colorRange;
                        var name;
                        if (isFinite(range.start + range.end)) {
                            name = range.start + '-' + range.end;
                        } else if (isFinite(range.start)) {
                            name = '>' + range.start;
                        } else {
                            name = '<' + range.end;
                        }
                        return name;
                    });

                series.colorScale(scale);

                // create zoom controls
                var zoomController = anychart.ui.zoom();
                zoomController.render(map);

                // set container id for the chart
                map.container('global');
                // initiate chart drawing
                map.draw();
            }
        );
    });
};

// Source: https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
// Random color
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
};

// (Bubble Chart for Developed Countries)
function bubbleGlobal() {

    // Call data data
    d3.json('/api/mmr-global').then(function (data) {
        // console.log(data);

        // Get data for developed countries
        var filteredData = data.filter(item =>
            (item.name === 'United States') ||
            (item.name === 'Australia') ||
            (item.name === 'Canada') ||
            (item.name === 'France') ||
            (item.name === 'Germany') ||
            (item.name === 'Netherlands') ||
            (item.name === 'New Zealand') ||
            (item.name === 'Norway') ||
            (item.name === 'Sweden') ||
            (item.name === 'Switzerland') ||
            (item.name === 'United Kingdom')
        );
        // console.log(filteredData);

        // Get data for plotting
        var mmrList = [];
        var nameList = [];
        var rankList = [];
        var textList = [];

        filteredData.forEach(country => {
            var mmrData = country.mmr;
            var nameData = country.name;
            var rankingData = country.ranking;
            var textHover = `Country: ${nameData} <br> MMR: ${mmrData} <br> Ranking: ${rankingData}`
            mmrList.push(mmrData);
            nameList.push(nameData);
            rankList.push(rankingData);
            textList.push(textHover);
        })

        // console.log(mmrList, nameList, rankList, textList);

        // trace for bubble chart
        // Get random color
        var colors = [];
        for (var i = 0; i < textList.length; i++) {
            var color = random_rgba();
            colors.push(color);
        };

        var trace = {
            x: nameList,
            y: mmrList,
            mode: 'markers',
            marker: {
                size: mmrList.map(mmr => mmr * 5),
                color: colors,
                colorscale: 'Earth',
                opacity: mmrList.map(id => 0.7)
            },
            type: 'scatter',
            text: textList
        };

        // data
        var data = [trace];

        // Apply parameter to the layout
        var layout = {
            title: `<b>MMR: Developed Countries</b>`,
            showlegend: false,
            yaxis: {
                title: "<b>MMR</b>"
            }
        };

        var config = { responsive: true, displayModeBar: false };

        // Render the plot to the div tag with id "bubble"
        Plotly.newPlot('global-bubble', data, layout, config);
    });
};

function regionChanged(region) {
    pieCause(region);
};

// Initialize arrays to hold data
var regions = [];
var causes_data = [];
var causes = [];

function init() {
    // Call data data
    d3.json('/api/causes-of-deaths').then(function (data) {
        // console.log(data);

        // Get region
        data.forEach(item => {
            causes_data.push(item);
            continent = item.region;
            regions.push(continent);
        });
        // console.log(causes_data);

        // Create Drop down
        var selection = d3.select("#selDataset");

        regions.forEach(item => {
            var options = selection.append("option");
            options.property("value", item);
            options.text(item);
        });
        regionChanged(selection.property("value"));
    });

};


// Causes of Death (Pie chart)
function pieCause(region) {

    // Get data by region
    var filteredData = causes_data.filter(event => event.region === region);
    // console.log(filteredData);

    var pieData = filteredData[0];
    // console.log(pieData);

    // Get data for each region
    var abortion = pieData.abortion;
    var embolism = pieData.embolism;
    var haemorrhage = pieData.haemorrhage;
    var hypertension = pieData.hypertension;
    var sepsis = pieData.sepsis;
    var other_direct_causes = pieData.other_direct_causes;
    var indirect_causes = pieData.indirect_causes;
    var pieDatalist = [abortion, embolism, haemorrhage, hypertension, sepsis, other_direct_causes, indirect_causes]
    // console.log(abortion, embolism, haemorrhage, hypertension, sepsis, other_direct_causes, indirect_causes);

    // trace for pie chart
    // Get random color
    var colors = ['rgb(229, 152, 102)', 'rgb(247, 220, 111)',
        'rgb(69, 179, 157)', 'rgb(205, 97, 85 )',
        'rgb(210, 180, 222)', 'rgb(27, 79, 114)', 'rgb(170, 183, 184)'];

    var data = [{
        values: pieDatalist,
        labels: ['Abortion*', 'Embolism', 'Haemorrhage', 'Hypertension', 'Sepsis', 'Other Direct Causes*', 'Indirect Causes'],
        textinfo: "label+percent",
        textposition: "outside",
        type: 'pie',
        name: pieData.region,
        marker: {
            colors: colors,
            colorscale: 'earth'
        },
        automargin: true
    }];

    var layout = {
        showlegend: false
    };

    var config = { responsive: true, displayModeBar: false };

    Plotly.newPlot('pie-global', data, layout, config);

};