anychart.onDocumentReady(function () {
  anychart.data.loadJsonFile(
    '/api/mmr-us',
    function (data) {
      var map = anychart.map();

      console.log(data);
      data = data.filter(a => a.year == "2019"); //filter by year
      console.log(data);

      var dataSet = anychart.data.set(data);
      var mmrData = dataSet.mapAs({value: 'mmr'});

      console.log(data);
      
      //set map title settings using html
      map
        .title()
        .enabled(true)
        .useHtml(true)
        .padding(10, 0)
        .hAlign('center')
        .fontFamily('\'Verdana\', Helvetica, Arial, sans-serif')
        .text(
          '<b style="color:#696969">United States Maternal Mortality Ratio</b><br/>' +
          '<span style="color:#929292; font-size: 12px;">Maternal deaths per 100,000 live births<br/>' +
          '<span  style="color:#929292; font-size: 10px;">(Data source: )</span>' //todo: enter data source
        );

      // map
        // .credits()
        // .enabled(true)
        // .url(
        //   'https://www.businessinsider.com/wine-consumption-map-united-states-2014-3'
        // )
        // .text(
        //   'Data source: https://www.businessinsider.com/wine-consumption-map-united-states-2014-3'
        // )
        // .logoSrc(
        //   'https://static.anychart.com/images/maps_samples/USA_Map_with_Linear_Scale/favicon.ico'
        // );

      map.geoData('anychart.maps.united_states_of_america'); //set map Geo data

      var series = map.choropleth(mmrData);

      // When user hovers over each state
      series
          .hovered()
          .fill('#18618d')
          .stroke(anychart.color.darken('#18618d'));

      // series
          // .selected()
          // .fill('#c2185b')
          // .stroke(anychart.color.darken('#c2185b'));

      series
          .tooltip()
          .useHtml(true)
          .format(function () {
              return (
                  '<span style="color: #d9d9d9">MMR</span>: ' +
                  parseFloat(this.value).toLocaleString() +
                  '<br/>' +
                  '<span style="color: #d9d9d9">Births</span>: ' +
                  parseInt(this.getData('births')).toLocaleString() +
                  '<br/>' +
                  '<span style="color: #d9d9d9">Deaths</span>: ' +
                  parseInt(this.getData('deaths')).toLocaleString() +
                  '<br/>' +
                  '<span style="color: #d9d9d9">Population</span>: ' +
                  this.getData('population')
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
      map.container('us-map');
      // initiate chart drawing
      map.draw();
    }
  );
});