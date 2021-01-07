// Main js linked to index

// Load stuff when document ready
// Source: https://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        GlobalMap();
        bubbleGlobal();
    };
};


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
                        '<span style="color:#929292; font-size: 12px;">Maternal deaths per 100,000 live births<br/>' +
                        '<span  style="color:#929292; font-size: 10px;">(Data source: Unicef, 2017)</span>'
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
            title: `<b>MMR Among Developed Countries</b>`,
            showlegend: false,
            xaxis: {
                title: "<b>Country</b>"
            },
            yaxis: {
                title: "<b>MMR</b>"
            }
        };
        // Render the plot to the div tag with id "bubble"
        Plotly.newPlot('global-bubble', data, layout);
    });
};



// var filteredData = samples.filter(event => parseInt(event.id) === parseInt(id));

// // filteredData is a dictionary, to get an array, the index needed to pass in
// var test_data = filteredData[0];

// // Get sample_values, otu_ids, otu_labels
// var sample_values = test_data.sample_values;
// var otu_ids = test_data.otu_ids;
// var otu_labels = test_data.otu_labels;

// // Get random color
// var colors = [];
// for (var i = 0; i < otu_ids.length; i++) {
//     var color = random_rgba();
//     colors.push(color);
// };

// // trace for bubble chart
// var trace = {
//     x: otu_ids,
//     y: sample_values,
//     mode: 'markers',
//     marker: {
//         size: sample_values,
//         color: colors,
//         opacity: otu_ids.map(id => 0.7)
//     },
//     type: 'scatter',
//     text: otu_labels
// };

// // data
// var data = [trace];

// // Apply parameter to the layout
// var layout = {
//     title: `<b>OTUs Found in an Individual</b><br>(Test ID:${id})`,
//     showlegend: false,
//     xaxis: {
//         title: "<b>OTU ID</b>"
//     },
//     yaxis: {
//         title: "<b>Number of Samples</b>"
//     }
// };
// // Render the plot to the div tag with id "bubble"
// Plotly.newPlot('bubble', data, layout);
