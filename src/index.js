import './styles.scss'
import * as d3 from 'd3'

//  the data that powers the bar chart, a simple array of numeric values
// prettier-ignore
var chartdata1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
  135, 150, 165, 180, 200, 220, 240, 270, 300, 330, 370, 410];

// prettier-ignore
var chartdata2 = [410, 370, 330, 270, 240, 220, 200, 180, 165, 150, 135, 130,
    135, 150, 165, 180, 200, 220, 240, 270, 300, 330, 370, 410];

var chartdata = chartdata1

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

var svg = d3
	.select('#bar-chart')
	.append('svg')
	.attr('width', width)
	.attr('height', height)
	.style('background', '#dff0d8')

function updateChart(data) {
	// JOIN new data with old elements.
	var chart = svg.selectAll('rect').data(data)

	// EXIT old elements not present in new data.
	chart.exit().remove()

	// UPDATE old elements present in new data.
	chart
		.attr('height', 0)
		.attr('y', height)
		.transition()
		.attr('height', function(data) {
			return y(data)
		})
		.attr('y', function(data) {
			return height - y(data)
		})
		.delay(function(data, i) {
			return i * 20
		})
		.duration(1000)
		.ease(d3.easeExpOut)

	// ENTER new elements present in new data.
	chart
		.enter()
		.append('rect')
		.style('fill', (data, i) => color(i))
		.style('stroke', '#31708f')
		.style('stroke-width', '5')
		.attr('width', x.bandwidth())
		.attr('x', function(data, i) {
			return x(i)
		})
		.attr('height', 0)
		.attr('y', height)
		.on('mouseover', function(data) {
			dynamicColor = this.style.fill
			d3.select(this).style('fill', '#3c763d')
		})
		.on('mouseout', function(data) {
			d3.select(this).style('fill', dynamicColor)
		})
		.transition()
		.attr('height', function(data) {
			return y(data)
		})
		.attr('y', function(data) {
			return height - y(data)
		})
		.delay(function(data, i) {
			return i * 20
		})
		.duration(1000)
		.ease(d3.easeExpOut)
}

updateChart(chartdata)

// Change data
var isChartata1 = true
d3.select('#btn').on('click', () => {
	if (isChartata1) {
		chartdata = chartdata2
	} else {
		chartdata = chartdata1
	}

	isChartata1 = !isChartata1
	updateChart(chartdata)
})
