import './styles.scss'
import * as d3 from 'd3'

//  the data that powers the bar chart, a simple array of numeric values
// prettier-ignore
var chartdata = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 
  135, 150, 165, 180, 200, 220, 240, 270, 300, 330, 370, 410];

//  the size of the overall svg element
var height = 200,
	width = 720,
	//  the width of each bar and the offset between each bar
	barWidth = 40,
	barOffset = 20

var x = d3.scaleBand().domain(d3.range(0, chartdata.length)).range([ 0, 720 ])
var y = d3.scaleLinear().domain([ 0, d3.max(chartdata) ]).range([ 0, 200 ])
var color = d3
	.scaleLinear()
	.domain([ 0, chartdata.length * 0.33, chartdata.length * 0.66, chartdata.length ])
	.range([ '#d6e9c6', '#bce8f1', '#faebcc', '#ebccd1' ])

var dynamicColor
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
	.style('fill', (data, i) => color(i))
	.style('stroke', '#31708f')
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
	.on('mouseover', function(data) {
		dynamicColor = this.style.fill
		d3.select(this).style('fill', '#3c763d')
	})
	.on('mouseout', function(data) {
		d3.select(this).style('fill', dynamicColor)
	})
