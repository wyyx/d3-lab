import './styles.scss'
import * as d3 from 'd3'
import './d3.tsv'

d3.tsv('./d3.tsv').then(function(data) {
	data.forEach(function(d) {
		d.value = +d.value
	})

	console.log('data', data)

	var margin = { top: 20, right: 30, bottom: 30, left: 40 },
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom

	var x = d3
		.scaleBand()
		.domain(
			data.map(function(d) {
				return d.name
			})
		)
		.range([ 0, width ])
		.padding(0.1)

	var y = d3
		.scaleLinear()
		.domain([
			0,
			d3.max(data, function(d) {
				return d.value
			})
		])
		.range([ height, 0 ])

	var chart = d3
		.select('.chart')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

	var bar = chart.selectAll('g').data(data).enter().append('g').attr('transform', function(d) {
		return 'translate(' + x(d.name) + ',0)'
	})

	bar
		.append('rect')
		.attr('class', 'bar')
		.attr('y', function(d) {
			return y(d.value)
		})
		.attr('height', function(d) {
			return height - y(d.value)
		})
		.attr('width', x.bandwidth)

	// Create axes
	var xAxis = d3.axisBottom(x)
	var yAxis = d3.axisLeft(y).ticks(10, '%')

	chart
		.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis)

	chart
		.append('g')
		.attr('class', 'y axis')
		.call(yAxis)
		.append('text')
		.attr('fill', 'black')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '.71em')
		.style('text-anchor', 'end')
		.text('Frequency')
})
