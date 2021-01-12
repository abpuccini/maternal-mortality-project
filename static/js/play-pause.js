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
    slider.value = i;
    output.innerHTML = i;
    await sleep(400);
    console.log(i);
    i++;
    if(i==2020) i=2009;
  }

  // if(status=='play') {
  //   for(; i < 2020; i++) {
  //     if(status=='play') {
  //       slider.value = i;
  //       output.innerHTML = i;
  //       await sleep(200);
  //     }
  //   } 
  //   await sleep(200);
  //   console.log(i);
  // }
}




function buttonPlayPress() {
  if(status=='play'){
    status = 'pause';
    d3.select("#button_play i").attr('class', "fa fa-play"); 

    // for(; i < 2020; i++) {
    //   document.getElementById("yearRange").value++;
    // }
  }
  else if(status=='pause'){
    status = 'play';
    d3.select("#button_play i").attr('class', "fa fa-pause");    
    slideYear();
  }
  console.log("button play pressed, play was "+status);
}