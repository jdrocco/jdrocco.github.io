var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementById('particles-js')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight || g.clientHeight;

var svg = d3.select("#particles-js").append("svg").attr("width",width)
            .attr("height",height);

var colorScale = d3.scaleLinear().domain([0,1.5]).range(["black","red"]);

var nodeData = [];

var hexbin = d3.hexbin()
    .size([width, height])
    .radius(21);

var k, numcircs=hexbin.centers().length;
for (k = 0; k < numcircs; k++) {
    nodeData.push( { 'x': hexbin.centers()[k][0],
      'y': hexbin.centers()[k][1],
      'r': Math.random() * 14 + 11});
}

var nodePadding = 0.02

var collisionForce = d3.forceCollide().radius(function(d){ return d.r + nodePadding; }).strength(0.8).iterations(50);

var simulation = d3.forceSimulation(nodeData).alphaDecay(0.01).force("collisionForce",collisionForce);

 var node = svg.selectAll("circle").data(nodeData)
            .enter().append("circle")
            .attr("r",function(d){ return d.r;}).attr("cx",function(d){ return d.x;}).attr("cy",function(d){ return d.y;})
            .attr("fill","black").attr("opacity",0.5)
            .call(d3.drag()
            .on("start",dragstarted)
            .on("drag",dragged)
            .on("end",dragended));
 
 function dragstarted(d)
 { 
    collisionForce.strength(1.9);
    simulation.restart();
    simulation.alpha(0.7);
    d.fx = d.x;
    d.fy = d.y;
 }

 function dragged(d)
 {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
 }

 function dragended(d)
 {
    d.fx = null;
    d.fy = null;
    simulation.alphaTarget(0.1);
 }

 function ticker(){
     node.attr("cx", function(d){ return d.x;})
         .attr("cy", function(d){ return d.y;})
         .style("fill", function(d) { 
           return colorScale((d.vx*d.vx)+(d.vy*d.vy)); 
         })
 }

 simulation.on("tick",ticker);
