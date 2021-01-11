anychart.onDocumentReady(function () {
  // The data used in this sample can be obtained from the CDN
  // https://cdn.anychart.com/samples/maps-choropleth/wine-consumption-map-of-usa/data.json
  anychart.data.loadJsonFile(
    'https://cdn.anychart.com/samples/maps-choropleth/wine-consumption-map-of-usa/data.json',
    function (data) {
      var map = anychart.map();

      var dataSet = anychart.data.set(data);

      //set map title settings using html
      map
        .title()
        .enabled(true)
        .useHtml(true)
        .padding(10, 0)
        .hAlign('center')
        .fontFamily('\'Verdana\', Helvetica, Arial, sans-serif')
        .text(
          '<span style="color:#7c868e; font-size: 18px"> Title</span><br>' +
          '<span style="color:#545f69; font-size: 14px">Subtitle</span>'
        );

      map
        .credits()
        .enabled(true)
        .url(
          'https://www.businessinsider.com/wine-consumption-map-united-states-2014-3'
        )
        .text(
          'Data source: https://www.businessinsider.com/wine-consumption-map-united-states-2014-3'
        )
        .logoSrc(
          'https://static.anychart.com/images/maps_samples/USA_Map_with_Linear_Scale/favicon.ico'
        );

      //set map Geo data
      map.geoData('anychart.maps.united_states_of_america');

      var colorRange = map.colorRange();
      colorRange
        .enabled(true)
        .padding([20, 0, 0, 0])
        .colorLineSize(10)
        .stroke('#B9B9B9')
        .labels({ padding: 3 })
        .labels({ size: 7 });
      colorRange
        .ticks()
        .enabled(true)
        .stroke('#B9B9B9')
        .position('outside')
        .length(10);
      colorRange
        .minorTicks()
        .enabled(true)
        .stroke('#B9B9B9')
        .position('outside')
        .length(5);

      var series = map.choropleth(dataSet);
      series.colorScale(
        anychart.scales.linearColor(
          '#c2e9fb',
          '#81d4fa',
          '#01579b',
          '#002746'
        )
      );
      series
        .hovered()
        .fill('#f48fb1')
        .stroke(anychart.color.darken('#f48fb1'));
      series
        .selected()
        .fill('#c2185b')
        .stroke(anychart.color.darken('#c2185b'));
      series
        .labels()
        .enabled(true)
        .fontSize(10)
        .fontColor('#212121')
        .format('{%Value}')
        .textShadow({
          color: '#ffffff',
          offsetX: '1px',
          offsetY: '1px',
          blurRadius: '1px'
        });
      series
        .tooltip()
        .useHtml(true)
        .format(function () {
          return (
            '<span style="font-size: 13px">' +
            this.value +
            ' litres per capita</span>'
          );
        });

      // set container id for the chart
      map.container('us-map');
      // initiate chart drawing
      map.draw();
    }
  );
});