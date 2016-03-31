

	// hardcoded dataset for testing/dev
var data = { "ranking": [
				{	"company": "Google",
					"score": 4.029889595182335,
					"rank": 2
				},
				{ "company": "Glassdoor", 
					"score": 4.396139705882353, 
					"rank": 1
				},
				{ "company": "TubeMogul",
					"score": 3.5196899224806204,
					"rank": 3
				},
			]
}

var w = 300;
var h = 150;
var yOffset = 25;
var heightScale = yOffset;

var svg = d3.select(".ranking")  //body
            .append("svg")
            .attr("width", w)
            .attr("height", h);

d3.json(data, function(json){

	var data = json.ranking;
	var max_n = 0;
	for (var d in data) {
		max_n = Math.max(data[d].n, max_n);
	};
	var dx = w/max_n;
	var dy = h/data.length;


var bars = svg.selectAll(".bar")// rect
			   .data(data)
			   .enter()
			   .append("rect")
			   .attr("class", function(d, i) {return "bar " + d.company};)
			   .attr("x", function(d, i) {return dy * i};)
			   .attr("y", function(d, i) {return dx*d.score};)
			   .attr("width", function(d, i) {return dx*d.score};)
			   .attr("height", dy)
			   .attr("fill", "#181B59");
			   space for each bar incl padding

			bars.transition()
			  .duration(2000)
			  .delay(200)
			  // set y position of each bar
			  .attr("y", function(d) {
			    return h + yOffset - (d * heightScale); 
			})
			   .attr("height", function(d) {
			    return d * 20;
			})

var text = svg.selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.attr("class", function(d, i) {return "company " + d.company})
	.attr("x", 5)
	.attr("y", function(d, i){return d.company+ " (" + d.n  + ")";})
	.attr("font-size", "15px")
	.style("font-weight", "bold");

});
