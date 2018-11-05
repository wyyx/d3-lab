import './styles.scss'
import * as d3 from 'd3'

//  the data that powers the bar chart, a simple array of numeric values
var chartdata = [ 40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140 ]

//  the size of the overall svg element
var height = 200,
	width = 720,
	//  the width of each bar and the offset between each bar
	barWidth = 40,
	barOffset = 20

var x = d3.scaleBand().domain(d3.range(0, chartdata.length)).range([ 0, 720 ]).padding(0.2)
var y = d3.scaleLinear().domain([ 0, d3.max(chartdata) ]).range([ 0, 200 ])

d3
	.select('#bar-chart')
	.append('svg')
	.attr('width', width)
	.attr('height', height)
	.style('background', '#dff0d8')
	.selectAll('rect')
	.data(chartdata)
	.enter()
	.append('rect')
	.style('fill', '#3c763d')
	.style('stroke', '#d6e9c6')
	.style('stroke-width', '5')
	.attr('width', x.bandwidth())
	.attr('height', function(data) {
		return y(data)
	})
	.attr('x', function(data, i) {
		return x(i)
	})
	.attr('y', function(data) {
		return height - y(data)
	})
