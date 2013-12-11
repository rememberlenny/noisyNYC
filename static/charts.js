d3.csv("top_complaints.csv")
    .row(function(d) {

		var new_d = {

			complaint: d['Complaint Type'],
			count: +d['Count']
		};
    	return new_d;
    })
	.get(function(error, rows) {

        var w = 1000;
        var h = 600;
        var padding = 50;


        var complaintCountScale = d3.scale.linear();
        var yAxisScale = d3.scale.linear();

        var xAxisScale = d3.scale.ordinal();

        test = rows.map(function (d) {return d.complaint; })

        console.log(test)
        console.log(test.length)

        xAxisScale
            .domain(rows.map(function (d) {return d.complaint; }))
            .rangeBands([0, w]);
            


        var maxDomain = d3.max(rows, function (d) {
            return d.count;
        });

        var minDomain = d3.min(rows, function (d) {
            return d.count;
        });

        complaintCountScale
            .domain([minDomain, maxDomain])
            .range([20, h]);

         yAxisScale
            .domain([maxDomain, minDomain])
            .range([0, h]);

        var svg = d3.select('.d3_chart')
                .append('svg')
                .attr('w', w)
                .attr('h', h);

        svg.selectAll('rect')
            .data(rows)
            .enter()
            .append('rect')
                .attr('x', function (d, i) {
                    return i * (w/rows.length) + padding;
                })
                .attr('y', function (d, i) {
                    return h - complaintCountScale(d.count);
                    
                })
                .attr('width', function (d, i) {
                    return (w / rows.length) - 2;
                })
                .attr('height', function (d, i) {
                    return complaintCountScale(d.count); 
                })
                .attr("fill", function(d, i) {
                    return "rgb(" + (i * 55) + ", " +  (i * 5) + ","  + (1) + ")";
                });

        svg.selectAll('text')
            .data(rows)
            .enter()
            .append('text')
                .attr('y', function (d, i) {
                    return h - complaintCountScale(d.count) + 10;
                })
                .attr('x', function (d, i) {
                    return i * (w / rows.length) + padding;
                })   
                .text(function (d) {
                    return d.count;
                })
                .attr("font-family", "helvetica")
                .attr("font-size", "11px")
                .attr("fill", "white")
                .attr("text-anchor", "right");

        var yAxis = d3.svg.axis()
                  .scale(yAxisScale)
                  .orient("left")
                  .ticks(5);

        var xAxis = d3.svg.axis()
                    .scale(xAxisScale)
                    .orient("bottom");


        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + "," + h + ")")
            .call(xAxis)
                .selectAll("text")  
                .style("text-anchor", "end")
                .attr("transform", function(d) {
                    return "rotate(-90)" 
                    });

    });