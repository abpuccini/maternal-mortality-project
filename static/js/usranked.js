// Initialize arrays to hold data
var states = [];
var measure_list = [];
var extremeStates = [];
var mmr_list = [];
var abbreviation_list = [];
var topStates = [];
var bottomStates = [];


// Function to call data when the webpage loads
function init() {
    // Append options for users to select based on ids
    d3.json("/api/hwc").then(function (data) {
      d3.json("/api/hwc-key").then(function (mes) {

        measureData = mes;
        rankedData = data;

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
    
      
        var filteredMeasures1 = measureData.filter(event => event.measure_name !== "Maternal Mortality");
        var filteredMeasures = filteredMeasures1.filter(event => event.measure_name !== "Postpartum Visit");

        filteredMeasures.forEach(element => {
          measure = element.measure_name;
          abbreviation = element.abbreviation;
          measure_list.push(measure);
          abbreviation_list.push(abbreviation);
        });
    

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

      //initialize empty lists for storing data about each measure
      
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

      //get the abbreviation for the measure called by the dropdown menu
      called_measure = filteredMeasure[0].abbreviation;
      full_called_measure = filteredMeasure[0].measure_name;

    rankedData.forEach(element => {

        state = element.state;
        
        ahi = element.ahi;
        ahi_data.push({
          key : state, 
          value: ahi.rank
        });

        ai = element.ai;
        ai_data.push({
          key : state, 
          value: ai.rank
        });

        apc = element.apc;
        apc_data.push({
          key : state, 
          value: apc.rank
        });

        ac = element.ac;
        ac_data.push({
          key : state, 
          value: ac.rank
        });

        dhcp = element.dhcp;
        dhcp_data.push({
          key : state, 
          value: dhcp.rank
        });

        ds = element.ds;
        ds_data.push({
          key : state, 
          value: ds.rank
        });

        how = element.how;
        how_data.push({
          key : state, 
          value: how.rank
        });

        im = element.im;
        im_data.push({
          key : state, 
          value: im.rank
        });

        mm = element.mm;
        mm_data.push({
          key : state, 
          value: mm.rank
        });

        mpinc = element.mpinc;
        mpinc_data.push({
          key : state, 
          value: mpinc.rank
        });

        mow = element.mow;
        mow_data.push({
          key : state, 
          value: mow.rank
        });

        pw = element.pw;
        pw_data.push({
          key : state, 
          value: pw.rank
        });

        ow = element.ow;
        ow_data.push({
          key : state, 
          value: ow.rank
        });

        ppv = element.ppv;
        ppv_data.push({
          key : state, 
          value: ppv.rank
        });

        pctt = element.pctt;
        pctt_data.push({
          key : state, 
          value: pctt.rank
        });

        pfhs = element.pfhs;
        pfhs_data.push({
          key : state, 
          value: pfhs.rank
        });

        rpa = element.rpa;
        rpa_data.push({
          key : state, 
          value: rpa.rank
        });

        uw = element.uw;
        uw_data.push({
          key : state, 
          value: uw.rank
        });

        wwv = element.wwv;
        wwv_data.push({
          key : state, 
          value: wwv.rank
        });

        wic = element.wic;
        wic_data.push({
          key : state, 
          value: wic.rank
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

        // bottom_5_mmr.forEach(element =>{
        //   state = element.key;
        //   bottomStates.push(state);
        //   extremeStates.push(state);
        // });

        
        //slice the top 5 results
        var reversed_mmr_list = mmr_list.reverse()
        reversed_mmr_list.length = 52;
        console.log(Array.prototype.slice.call(reversed_mmr_list, 5));

        var top_5_mmr = [];
        for (var i=0; i<5; i++)
        top_5_mmr[i] = reversed_mmr_list[i];

        // top_5_mmr.forEach(element =>{
        //   state = element.key;
        //   topStates.push(state);
        //   extremeStates.push(state);
        // });

      // use f string to create wanted dataset name
      var sought_measure = `${called_measure}_data`;

      // use dropdown measure to choose dataset for plot
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
    

      var top_5_measure_list = [];
      var top_5_mmr_values = [];
      var top_5_mmr_states = [];
      var bottom_5_measure_list = [];
      var bottom_5_mmr_values = [];
      var bottom_5_mmr_states = [];

      // get the values for the measure being compared for the bottom 5 states
      function getTop(){
        for (i=0; i<graph_measure.length; i++){

        if ((graph_measure[i].key == "Alaska") || (graph_measure[i].key == "Massachusetts") || (graph_measure[i].key == "Nevada") || (graph_measure[i].key == "Delaware") || (graph_measure[i].key == "West Virginia")){
        top_5_measure_list.push(graph_measure[i].value)
        }}
    
        return top_5_measure_list

      };
         // get the actual mmr value for best 5 states
      function getTopmmr(){
        for (i=0; i<top_5_mmr.length; i++){

        top_5_mmr_values.push(top_5_mmr[i].value)
        top_5_mmr_states.push(top_5_mmr[i].key)
      }
        return top_5_mmr_values
      };
     
      // get the values for the measure being compared for the bottom 5 states
      function getBottom(){
        for (i=0; i<graph_measure.length; i++){

        if ((graph_measure[i].key == "Louisiana") || (graph_measure[i].key == "Georgia") || (graph_measure[i].key == "Indiana") || (graph_measure[i].key == "New Jersey") || (graph_measure[i].key == "Arkansas")){
        bottom_5_measure_list.push(graph_measure[i].value)
        }}
        
        return bottom_5_measure_list
      };

      // get the actual mmr value for worts 5 states
      function getBottommmr(){
        for (i=0; i<bottom_5_mmr.length; i++){
          
        bottom_5_mmr_values.push(bottom_5_mmr[i].value);
        bottom_5_mmr_states.push(bottom_5_mmr[i].key);
      }
        return bottom_5_mmr_values
      };


     console.log(mmr_list);
    
    // show chosen measure compared to 5 best MMR states
      var trace1 = {
        x: getTopmmr(),
        y:  getTop(),
        name: "States with Highest Maternal Mortality Rates",
        type: "scatter",
        mode: "markers",
        line: {
        color: 'rgb(210, 105, 30)',
        },
        marker: { size: 12},
        text: ["Louisiana", "Georgia", "Indiana", "New Jersey", "Arkansas"],
    };

    // show chosen measure compared to 5 worst MMR states
      var trace2 = {
        x: getBottommmr(),
        y: getBottom(),
        name: "States with Lowest Maternal Mortality Rates",
        type: "scatter",
        mode: "markers",
        line: {
        color: 'rgb(100, 120, 50)',
        },
        marker: { size: 12},
        text: ["Alaska", "Massachusetts", "Nevada", "Delaware", "West Virginia"],
  
    };

    var data = [trace1, trace2];

    var layout = {
      autosize: false,
      width: 1200,
      height: 600,
      yaxis:{
        title: `${full_called_measure}`
      },
      xaxis:{
        title: "Maternal Mortality"
      },
       title: `${full_called_measure} compared with Maternal Mortality Rates`,
      };

    Plotly.newPlot('rankedplot', data, layout);


  };
