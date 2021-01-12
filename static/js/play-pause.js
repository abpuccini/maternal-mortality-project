var i = 2009;
var status = 'pause';
var slider = document.getElementById("yearRange");
var output = document.getElementById("year");

function sleep(ms) { // add delay function: https://www.sitepoint.com/delay-sleep-pause-wait/
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

async function slideYear() {
  i = document.getElementById("year").innerHTML;
  while(status=='play') {
    slider.value = i; // increment slider
    output.innerHTML = i; // increment year input

    document.getElementById("us-map-2009").style.display = "none";
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

    document.getElementById("us-map-" + i).style.display = "block"; // make currently selected year map visible

    await sleep(700);
    // console.log(i);
    i++;
    if(i==2020) i=2009;
  }
}

function buttonPlayPress() {
  if(status=='play'){
    status = 'pause';
    d3.select("#button_play i").attr('class', "fa fa-play"); 
  }
  else if(status=='pause'){
    status = 'play';
    d3.select("#button_play i").attr('class', "fa fa-pause");    
    slideYear();
  }
  // console.log("button play pressed, play was "+status);
}