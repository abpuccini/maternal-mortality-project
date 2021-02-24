function drawMap(year, mapContainer) {
  anychart.data.loadJsonFile(
    '/api/mmr-us',
    function (data) {
      var map = anychart.map();

      data = data.filter(a => a.year == year); // filter by year

      var dataSet = anychart.data.set(data);
      var mmrData = dataSet.mapAs({value: 'mmr'});
      

      // set map title settings using html
      map
        .title()
        .enabled(true)
        .useHtml(true)
        .padding(10, 0)
        .hAlign('center')
        .fontFamily('\'Verdana\', Helvetica, Arial, sans-serif')
        .text(
          '<b style="color:#696969"> United States Maternal Mortality Ratio ' + year + '</b><br/>' +
          '<span style="color:#929292; font-size: 12px;">Maternal Deaths per 100,000 Live Births<br/>' +
          '<span style="color:#929292; font-size: 10px;">(Data Source: NCHS - CDC WONDER)</span>'
        );

      map.geoData('anychart.maps.united_states_of_america'); // set map Geo data
      map.interactivity().selectionMode('none');

      var series = map.choropleth(mmrData);

      series
          .hovered() // hover over us state
          .fill('#18618d')
          .stroke(anychart.color.darken('#18618d'));
      series
          .selected()
          .fill('#18618d')
          .stroke(anychart.color.darken('#18618d'));
      
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
        { from: 20, to: 30 },
        { from: 30, to: 40 },
        { from: 40, to: 50 },
        { from: 50, to: 60 },
        { from: 60, to: 70 },
        { from: 70, to: 80 },
        { greater: 80 }
      ]);
      scale.colors([
          '#fcfcce',
          '#f6f76c',
          '#d3f6d3',
          '#bdddbd',
          '#bbdefb',
          '#64b5f6',
          '#f4c884',
          '#ea910a',
          '#ea210a',
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

      // set container id for the chart
      map.container(mapContainer);
      // initiate chart drawing
      map.draw();
    }
  );
}

$(document).ready(function() {
  drawMap(2019, 'us-map-2019');
  drawMap(2018, 'us-map-2018');
  drawMap(2017, 'us-map-2017');
  drawMap(2016, 'us-map-2016');
  drawMap(2015, 'us-map-2015');
  drawMap(2014, 'us-map-2014');
  drawMap(2013, 'us-map-2013');
  drawMap(2012, 'us-map-2012');
  drawMap(2011, 'us-map-2011');
  drawMap(2010, 'us-map-2010');
  drawMap(2009, 'us-map-2009'); 
  // need to load and render all map divs otherwise there will be delay and the map with flash white when animating
})

$(window).load(function() {
  document.getElementById("us-map-2010").style.display = "none";
  document.getElementById("us-map-2011").style.display = "none";
  document.getElementById("us-map-2012").style.display = "none";
  document.getElementById("us-map-2013").style.display = "none";
  document.getElementById("us-map-2014").style.display = "none";
  document.getElementById("us-map-2015").style.display = "none";
  document.getElementById("us-map-2016").style.display = "none";
  document.getElementById("us-map-2017").style.display = "none";
  document.getElementById("us-map-2018").style.display = "none";
  document.getElementById("us-map-2019").style.display = "none";
  // disable hidden divs for performance
 })
