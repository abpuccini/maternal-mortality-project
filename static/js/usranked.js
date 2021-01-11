// Initialize arrays to hold data
var states = [];
var measure_list = [];
var extremeStates = [];
var mmr_list = [];
var abbreviation_list = [];

// Function to call data when the webpage loads
function init() {
    // Append options for users to select based on ids
    d3.json("/api/hwc").then(function (data) {
      d3.json("/api/hwc-key").then(function (mes) {

        measureData = mes;
        rankedData = data;

        console.log(measureData);
        console.log(rankedData);

        // create list of states
        rankedData.forEach(element => {
          state = element.state;
          mm_details = element.mm;
          mm_2019 = mm_details.value;
          mmr_list.push({
            key: state,
            value: mm_2019
        });
          states.push(state);
        });
    
      
        var filteredMeasures = measureData.filter(event => event.measure_name !== "Maternal Mortality");
        console.log(filteredMeasures);

        filteredMeasures.forEach(element => {
          measure = element.measure_name;
          abbreviation = element.abbreviation;
          measure_list.push(measure);
          abbreviation_list.push(abbreviation);
        });
        console.log(measure_list);

        var selection = d3.select("#selDataset");

        measure_list.forEach(val => {
          var options = selection.append("option");
          options.property("value", val);
          options.text(val);
        });



        buildPlot(selection.property("value"));
    
      });
   });

};

// Call init() function to render the page
init();

// function to render charts upon a selection from dropdown
function optionChanged(measure) {
    console.log(measure);
    buildPlot(measure);
};


// building plot for measure data
function buildPlot(measure) {
    var filteredMeasure = measureData.filter(event => event.measure_name === measure);

      console.log(filteredMeasure[0].abbreviation)
      
      var ahi_data = [];
      var ai_data = [];
      var apc_data = [];
      var ac_data = [];
      var dhcp_data = [];
      var ds_data = [];
      var how_data = [];
      var im_data = [];
      var mm_data = [];
      var mpinc_data = [];
      var mow_data = [];
      var pw_data = [];
      var ow_data = [];
      var ppv_data = [];
      var pctt_data = [];
      var pfhs_data = [];
      var rpa_data = [];
      var uw_data = [];
      var wwv_data = [];
      var wic_data = [];


      called_measure = filteredMeasure[0].abbreviation;
      console.log(called_measure)
      // console.log(ahi_data)

      // // function getMeasure(measure){
      //     switch (measure){
      //       case "ahi":
      //           return "ahi_data";
      //         break;
      //       case "ai":
      //           return "ai_data";
      //       case "apc":
      //           return "apc_data";
      //       case "ac":
      //           return "ac_data";
      //       case "dhcp":
      //           return "dhcp_data";
      //       case "ds":
      //           return "ds_data";
      //       case "how":
      //           return "how_data";
      //       case "im":
      //           return "im_data";
      //       case "mpinc":
      //           return "mpinc_data";
      //       case "mow":
      //           return "mow_data";
      //       case measure = "pw":
      //           return "pw_data";
      //       case measure = "ow":
      //           return "ow_data";
      //       case measure = "ppv":
      //           return "ppv_data";
      //       case measure = "pctt":
      //           return "pctt_data";
      //       case measure = "pfhs":
      //           return "pfhs_data";
      //       case measure = "rpa":
      //           return "rpa_data";
      //       case measure = "uw":
      //           return "uw_data";
      //       case measure = "wwv":
      //           return "wwv_data";
      //       case measure = "wic":
      //           return "wic_data";         
      //       default:
      //           return "measure not found";
      //    };
      // // };
    
      // final_m = getMeasure(called_measure)

      // console.log(final_m)

    rankedData.forEach(element => {

        state = element.state;
        
        ahi = element.ahi;
        ahi_data.push({
          key : state, 
          value: ahi.value
        });

        ai = element.ai;
        ai_data.push({
          key : state, 
          value: ai.value
        });

        apc = element.apc;
        apc_data.push({
          key : state, 
          value: apc.value
        });

        ac = element.ac;
        ac_data.push({
          key : state, 
          value: ac.value
        });

        dhcp = element.dhcp;
        dhcp_data.push({
          key : state, 
          value: dhcp.value
        });

        ds = element.ds;
        ds_data.push({
          key : state, 
          value: ds.value
        });

        how = element.how;
        how_data.push({
          key : state, 
          value: how.value
        });

        im = element.im;
        im_data.push({
          key : state, 
          value: im.value
        });

        mm = element.mm;
        mm_data.push({
          key : state, 
          value: mm.value
        });

        mpinc = element.mpinc;
        mpinc_data.push({
          key : state, 
          value: mpinc.value
        });

        mow = element.mow;
        mow_data.push({
          key : state, 
          value: mow.value
        });

        pw = element.pw;
        pw_data.push({
          key : state, 
          value: pw.value
        });

        ow = element.ow;
        ow_data.push({
          key : state, 
          value: ow.value
        });

        ppv = element.ppv;
        ppv_data.push({
          key : state, 
          value: ppv.value
        });

        pctt = element.pctt;
        pctt_data.push({
          key : state, 
          value: pctt.value
        });

        pfhs = element.pfhs;
        pfhs_data.push({
          key : state, 
          value: pfhs.value
        });

        rpa = element.rpa;
        rpa_data.push({
          key : state, 
          value: rpa.value
        });

        uw = element.uw;
        uw_data.push({
          key : state, 
          value: uw.value
        });

        wwv = element.wwv;
        wwv_data.push({
          key : state, 
          value: wwv.value
        });

        wic = element.wic;
        wic_data.push({
          key : state, 
          value: wic.value
        });
        
      });
      
        // sort the mmr
        mmr_list.sort((a, b) => (a.value > b.value) ? 1 : -1);

        // slice the bottom 5 results
        mmr_list.length = 52;
        console.log(Array.prototype.slice.call(mmr_list, 5));


        var bottom_5_mmr = [];
        for (var i=0; i<5; i++)
          bottom_5_mmr[i] = mmr_list[i];
        
        //slice the top 5 results
        var reversed_mmr_list = mmr_list.reverse()
        reversed_mmr_list.length = 52;
        console.log(Array.prototype.slice.call(reversed_mmr_list, 5));

        var top_5_mmr = [];
        for (var i=0; i<5; i++)
        top_5_mmr[i] = reversed_mmr_list[i];

      var sought_measure = `${called_measure}_data`;

      console.log(sought_measure);
      // console.log(graph_measure.value);
      // console.log(graph_measure.key);

      if (sought_measure === "ahi_data"){
        var graph_measure = ahi_data;
        console.log(graph_measure);
      } else if (sought_measure === "ai_data"){
        var graph_measure = ai_data;
        console.log(graph_measure);
      } else if (sought_measure === "apc_data"){
        var graph_measure = apc_data;
        console.log(apc_data);
      }else if (sought_measure === "ac_data"){
        var graph_measure = ac_data;
        console.log(graph_measure);
      }else if (sought_measure === "dhcp_data"){
        var graph_measure = dhcp_data;
        console.log(graph_measure)
      }else if (sought_measure === "ds_data"){
        var graph_measure = ds_data;
        console.log(graph_measure)
      }else if (sought_measure === "how_data"){
        var graph_measure = how_data;
        console.log(graph_measure)
      }else if (sought_measure === "im_data"){
        var graph_measure = im_data;
        console.log(graph_measure)
      }else if (sought_measure === "mpinc_data"){
        var graph_measure = mpinc_data;
        console.log(graph_measure)
      }else if (sought_measure === "mow_data"){
        var graph_measure = mow_data;
        console.log(graph_measure)
      }else if (sought_measure === "pw_data"){
        var graph_measure = pw_data;
        console.log(graph_measure)
      }else if (sought_measure === "ow_data"){
        var graph_measure = ow_data;
        console.log(graph_measure)
      }else if (sought_measure === "ppv_data"){
        var graph_measure = ppv_data;
        console.log(graph_measure)
      }else if (sought_measure === "pctt_data"){
        var graph_measure = pctt_data;
        console.log(graph_measure)
      }else if (sought_measure === "pfhs_data"){
        var graph_measure = pfhs_data;
        console.log(graph_measure)
      }else if (sought_measure === "rpa_data"){
        var graph_measure = rpa_data;
        console.log(graph_measure)
      }else if (sought_measure === "uw_data"){
        var graph_measure = uw_data;
        console.log(graph_measure)
      }else if (sought_measure === "wwv_data"){
        var graph_measure = wwv_data;
        console.log(graph_measure)
      }else if (sought_measure === "wic_data"){
        var graph_measure = wic_data;
        console.log(graph_measure)
      }else{
        console.log('error')
      }
      // console.log(ahi_data[1].value);

      

      var trace1 = {
        x: top_5_mmr,
        y: graph_measure[1].value,
        name: "Top 5 States",
        type: "scatter",
        mode: "lines+markers",
        line: {
        color: 'rgb(210, 105, 30)',
        }
    
    };
      var trace2 = {
        x: bottom_5_mmr,
        y: graph_measure[1].value,
        name: "Bottom 5 States",
        type: "scatter",
        mode: "lines+markers",
        line: {
        color: 'rgb(100, 120, 50)',
        }
  
    };

    var data = [trace1, trace2];

    var layout = {
        grid: {rows: 1, columns: 2, pattern: 'independent'},
      };

    Plotly.newPlot('rankedplot', data, layout);

// var trace1 = {
//   x: [1, 2, 3],
//   y: [4, 5, 6],
//   type: 'scatter'
// };

// var trace2 = {
//   x: [20, 30, 40],
//   y: [50, 60, 70],
//   xaxis: 'x2',
//   yaxis: 'y2',
//   type: 'scatter'
// };

// var data = [trace1, trace2];

// var layout = {
//   grid: {rows: 1, columns: 2, pattern: 'independent'},
// };

// Plotly.newPlot('myDiv', data, layout);

   };
