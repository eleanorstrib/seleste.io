

	// // hardcoded dataset for testing/dev
	// dataSet = { "ranking" :
	// 	{'Google': 4.029889595182335,
	// 		'rank': 1,
	// 	},
	// 	{ 'Glassdoor': 4.396139705882353, 
	// 		'rank': 2,
	// 	'TubeMogul': 3.5196899224806204}
	// 	}
	// }
dataset = [4.029889595182335, 4.396139705882353, 3.5196899224806204]

var w = 300;
var h = 150;
var yOffset = 25;
var heightScale = yOffset;

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

var bars = svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("fill", "#181B59")
			   //space for each bar incl padding
			   .attr("x", function(d, i) {
			    	return i * (150 / dataset.length);
				})
			   .attr("y", h-300)
			   .attr("width", 30)
			   .attr("height", 1);

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



