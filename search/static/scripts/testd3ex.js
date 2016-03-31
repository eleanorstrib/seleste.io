var bars = {}


var w = 500,
		    h = 100;

		var svg = d3.select("#chart")
			.append("svg")
			.attr("width", w)
			.attr("height", h);
	
		d3.json("bars.json", function(json) {
	
			var data = json.items;
	
			var max_n = 0;
			for (var d in data) {
				max_n = Math.max(data[d].n, max_n);
			}
		
			var dx = w / max_n;
			var dy = h / data.length;
	
			// bars
			var bars = svg.selectAll(".bar")
				.data(data)
				.enter()
				.append("rect")
				.attr("class", function(d, i) {return "bar " + d.label;})
				.attr("x", function(d, i) {return 0;})
				.attr("y", function(d, i) {return dy*i;})
				.attr("width", function(d, i) {return dx*d.n})
				.attr("height", dy);
	
			// labels
			var text = svg.selectAll("text")
				.data(data)
				.enter()
				.append("text")
				.attr("class", function(d, i) {return "label " + d.label;})
				.attr("x", 5)
				.attr("y", function(d, i) {return dy*i + 15;})
				.text( function(d) {return d.label + " (" + d.n  + ")";})
				.attr("font-size", "15px")
				.style("font-weight", "bold");
		});