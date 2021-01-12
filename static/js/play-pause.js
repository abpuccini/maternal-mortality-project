var status = 'pause';
function buttonPlayPress() {
  if(status=='play'){
    status = 'pause';
      d3.select("#button_play i").attr('class', "fa fa-play"); 
  }
  else if(status=='pause'){
    status = 'play';
    d3.select("#button_play i").attr('class', "fa fa-pause");        
  }
  console.log("button play pressed, play was "+status);
}