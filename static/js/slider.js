var slider = document.getElementById("yearRange");
var output = document.getElementById("year");
output.innerHTML = slider.value; // year slider

slider.oninput = function() {
  output.innerHTML = this.value;
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

  document.getElementById("us-map-" + this.value).style.display = "block"; // make currently selected year map visible
}