var WIDTH = 800, HEIGHT = 450;
var Y_AXIS_LABEL = "Price ($)";

var X_DATA_PARSE = d3.time.format("%d-%b-%y").parse;

var Y_DATA_PARSE = vida.number;

var X_AXIS_COLUMN = "date";

var Y_AXIS_COLUMN = "close";

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = WIDTH - margin.left - margin.right,
    height = HEIGHT - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var area = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.x_axis); })
    .y0(height)
    .y1(function(d) { return y(y.domain()[1]); });

var line = d3.svg.line()
    .x(function(d) { return x(d.x_axis); })
    .y(function(d) { return y(d.y_axis); });

var svg = d3.select("#canvas-svg").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var drawD3Document = function(data) {
    var area_data = [];

    data.forEach(function(d) {
        d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
        d.y_axis = d[Y_AXIS_COLUMN];

        var x_date = (new Date(d.x_axis)).getTime();
        if (x_date > (new Date('2012-04-13')).getTime() &&
            x_date < (new Date('2012-04-17')).getTime()) {
            area_data.push(d);
        }
    });

    x.domain(d3.extent(data, function(d) { return d.x_axis; }));
    y.domain(d3.extent(data, function(d) { return d.y_axis; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(Y_AXIS_LABEL);

    svg.append("path")
        .datum(area_data)
        .attr("class", "area")
        .attr("d", area);

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
};/**
 * Created by ling on 2015-10-26.
 */
