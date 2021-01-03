// var url = 'http://newsapi.org/v2/everything?' +
//     'q=Maternal Mortality&' +
//     'from=2020-12-29&' +
//     'sortBy=popularity&' +
//     'apiKey=api_news';

// var req = new Request(url);

// fetch(req)
//     .then(function (response) {
//         console.log(response.json());
//     })

// var mmr_data = []

// function callData() {
//     d3.json("/api/mmr-global").then((data) => {
//         console.log(data);
//         data.forEach(data => {
//             var mmr = data.mmr;
//             mmr_data.push(mmr);
//         })
//         console.log(mmr_data)
//     })
// }

// callData();


// Source: https://www.anychart.com/products/anymap/gallery/Maps_General_Features/World_Choropleth_Map.php
anychart.onDocumentReady(function () {
    // The data used in this sample can be obtained from the CDN
    // https://cdn.anychart.com/samples/maps-general-features/world-choropleth-map/data.json
    anychart.data.loadJsonFile(
        'static/data/mmr_global.json',
        function (data) {
            var map = anychart.map();

            map.geoData('anychart.maps.world');
            map.interactivity().selectionMode('none');
            map.padding(0);

            var dataSet = anychart.data.set(data);
            var Data = dataSet.mapAs({ value: 'mmr' });
            var series = map.choropleth(Data);

            series.labels(false);

            map
                .title()
                .enabled(true)
                .useHtml(true)
                .padding([10, 0, 30, 0])
                .text(
                    '<b style="color:#696969">Global Maternal Mortality Ratio</b><br/>' +
                    '<span style="color:#929292; font-size: 12px;">Maternal deaths per 100,000 live births<br/>' +
                    '<span  style="color:#929292; font-size: 10px;">(Data source: Unicef, 2020)</span>'
                );

            series
                .hovered()
                .fill('#492a35')
                .stroke(anychart.color.darken('#301c23'));

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
                        parseFloat(this.value).toLocaleString()
                    );
                });

            var scale = anychart.scales.ordinalColor([
                { less: 10 },
                { from: 10, to: 30 },
                { from: 30, to: 50 },
                { from: 50, to: 100 },
                { from: 100, to: 200 },
                { from: 200, to: 300 },
                { greater: 300 }
            ]);
            scale.colors([
                '#81d4fa',
                '#4fc3f7',
                '#29b6f6',
                '#039be5',
                '#0288d1',
                '#0277bd',
                '#000000'
            ]);

            var colorRange = map.colorRange();
            colorRange.enabled(true).padding([0, 0, 20, 0]);
            colorRange
                .ticks()
                .enabled(true)
                .stroke('3 #ffffff')
                .position('center')
                .length(7);
            colorRange.colorLineSize(5);
            colorRange.marker().size(7);
            colorRange
                .labels()
                .fontSize(11)
                .padding(3, 0, 0, 0)
                .format(function () {
                    var range = this.colorRange;
                    var name;
                    if (isFinite(range.start + range.end)) {
                        name = range.start + ' - ' + range.end;
                    } else if (isFinite(range.start)) {
                        name = 'More than ' + range.start;
                    } else {
                        name = 'Less than ' + range.end;
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