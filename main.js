console.log(stakeholder_detailinfo);

var associativeArray = [];
var cat = [];

for (i = 0; i < stakeholder_detailinfo.length; i++) { 
		var stakeholder_category = stakeholder_detailinfo[i].stakeholder_category;
						
		for (j = 0; j < stakeholder_category.length; j++) { 
		
				var stakeholderss = [];
				var cat = {cat:stakeholder_category[j].label, stakeholders:stakeholderss};

				if(associativeArray.length > 0) {
						var bla = true;
						for (k = 0; k < associativeArray.length; k++) { 
						
								if(stakeholder_category[j].label == associativeArray[k].cat)
								{
										associativeArray[k].stakeholders.push(stakeholder_detailinfo[i]);
										var bla = false;
										break;
								} 
						}
						if (bla == true) {
								cat.stakeholders.push(stakeholder_detailinfo[i]);
								associativeArray.push(cat);
						}
										
				} else {
						cat.stakeholders.push(stakeholder_detailinfo[i]);
						associativeArray.push(cat);
				}
		}
}

var width = 900;
var height = 900;
var radius = Math.min(width, height) / 2;

var legendRectSize = 20;
// Spacing between squares
var legendSpacing = 4;
var legendX = width - 500;

var color = d3.scaleOrdinal(d3.schemeCategory20b);

var svg = d3.select('#chart')
		.append('svg')
				.attr('width', width)
				.attr('height', height)
						.append('g')
						.attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

var arc = d3.arc()
		.innerRadius(0)
		.outerRadius(radius);

var pie = d3.pie()
		.value(function(d){ return d.stakeholders.length;}) // Returns count of d
		.sort(null);

var g = svg.selectAll("path")
		.data(pie(associativeArray))          // We pass our data through the pie method which knows how to make the data usable.
		.enter();

g.append("path") // Replace placeholders from enter() with actual path objects.
		.attr("d", arc) // d is a new arc
		.attr('fill', function(d, i) { return color(i) } ); 

g.append("circle") // we append to each group elemtn once again, elke arcs zijn in een group
		 .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")";}) // returns center of each arc
		 .attr("cx", 0)           
		 .attr("cy", 0)          
		 .attr("r", 30);

var legend = svg.selectAll('.legend')
		.data(color.domain())
		.enter()
				.append('g')
				.attr('class', 'legend')
				.attr('transform', function(d, i) {
						var height = legendRectSize + legendSpacing;
						var offset =  height * color.domain().length / 2;
						var horz = -2 * legendRectSize;
						var vert = i * height - offset;
						return 'translate(' + horz + ',' + vert + ')';
				})

var circle = svg.append("circle")     
		 .attr("cx", 0)           
		 .attr("cy", 0)          
		 .attr("r", 100)            
		 .style("stroke", "black")   
		 .style("fill", "white");
		 
svg.append('text')
		 .attr('x', -50)
					.attr('y', 0)
					.text("Boontholder");
				legend.append('rect')
						.attr('x', legendX)
						.attr('width', legendRectSize)
						.attr('height', legendRectSize)
						.style('fill', color)
						.style('stroke', color);

legend.append('text')
	.attr('x', legendX + (legendRectSize + legendSpacing))
	.attr('y', legendRectSize - legendSpacing)
	.text(function(d) { return d; });

