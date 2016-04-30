// start slingin' some d3 here.
$(document).ready(function() {

  //Create Board

  //Width and height
  var w = 1000;
  var h = 500;

  var svg = d3.select("body")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

  var dataset = [ 5, 10, 15, 20, 25 ];

  var circles = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d, i){
      return (i * 50) + 25;
    })
    .attr("cy", h/2)
    .attr("r", function(d){
      return d;
    })
    .attr("fill", "yellow")
    .attr("stroke", "orange")
    .attr("stroke-width", function(d){
      return d/2;
    });

  svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");

  var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13];
  var barPadding = 20;

  svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
     return i * (w / dataset.length);
   }).attr("y", function(d) {
     return h - (d * 4);
   }).attr("width", w / dataset.length - barPadding)
   .attr("height", function(d) {
     return d * 4;
   })
    .attr("fill", "teal");

});
  // //spacebar
  // var moveSelection = function(e) {
  //   if (e.keyCode === 32) {
  //     //add pixels to the character to the y axis
  //   }
  // };








  // //event listener when the document is ready
  // (function docReady() {
  //   window.addEventListener('keydown', moveSelection);
  // })();