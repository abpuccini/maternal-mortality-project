// Initialize arrays to hold data
var states = [];
var measure_list = [];
var extremeStates = [];
var mmr_list = [];

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
          measure = element.measure_name
          measure_list.push(measure)
        });
        console.log(measure_list);

        var selection = d3.select("#selDataset");

        measure_list.forEach(item => {
          var options = selection.append("option");
          options.property("value", item);
          options.text(item);
        });



        buildPlot(selection.property("value"));
        //insChart(selection.property("value"));
        //state1Chart();
    
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
     var filteredData = rankedData.filter(event => event.measure === measure);

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

      function getMeasure(measure){
          switch (true){
            case measure = "Adequate Health Insurance":
                return "ahi_data";
            case measure = "Adequate Insurance":
                return "ai_data";
            case measure = "Adequate Prenatal Care":
                return "apc_data";
            case measure = "Avoided Care due to Cost":
                return "ac_data";
            case measure = "Dedicated Health Care Provider - Women":
                return "dhcp_data";
            case measure = "Developmental Screening":
                return "ds_data";
            case measure = "Health Outcomes - Women":
                return "how_data";
            case measure = "Infant Mortality":
                return "im_data";
            case measure = "Maternity Practices in Infant Nutrition and Care":
                return "mpinc_data";
            case measure = "Mortality - Women":
                return "mow_data";
            case measure = "Policy - Women":
                return "pw_data";
            case measure = "Overall - Women":
                return "ow_data";
            case measure = "Postpartum Visit":
                return "ppv_data";
            case measure = "Prenatal Care Before Third Trimester":
                return "pctt_data";
            case measure = "Publicly-Funded Women's Health Services":
                return "pfhs_data";
            case measure = "Receiving Public Assistance":
                return "rpa_data";
            case measure = "Uninsured Women":
                return "uw_data";
            case measure = "Well-Woman Visit":
                return "wwv_data";
            case measure = "WIC Coverage":
                return "wic_data";         
            default:
                return "measure not found";
        };
      };
    
      filteredData.forEach(element => {

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

        console.log(mmr_list);
        
        // slice the bottom 5 results
        mmr_list.length = 52;
        console.log(Array.prototype.slice.call(mmr_list, 5));


        var bottom_5_mmr = [];
        for (var i=0; i<5; i++)
          bottom_5_mmr[i] = mmr_list[i];
        console.log(bottom_5_mmr);  
        
        //slice the top 5 results
        var reversed_mmr_list = mmr_list.reverse()
        reversed_mmr_list.length = 52;

        console.log(Array.prototype.slice.call(reversed_mmr_list, 5));

        var top_5_mmr = [];
        for (var i=0; i<5; i++)
        top_5_mmr[i] = reversed_mmr_list[i];
        console.log(top_5_mmr); 

      var graph_measure = getMeasure(measure);

      console.log(graph_measure);

      var trace1 = {
        x: top_5_mmr,
        y: graph_measure.value,
        name: "Top 5 States",
        type: "scatter",
        mode: "lines+markers",
        line: {
        color: 'rgb(210, 105, 30)',
        }
    
    };
      var trace2 = {
        x: bottom_5_mmr,
        y: graph_measure.value,
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
