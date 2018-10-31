import './styles.scss'
import * as d3 from 'd3'
import './d3.tsv'

d3.tsv('./d3.tsv').then(function(data) {
	data.forEach(function(d) {
		d.value = +d.value
	})

	console.log('data', data)

	var width = 960,
		height = 500

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
		.range([ 0, height ])

	var chart = d3.select('.chart').attr('width', width).attr('height', height)

	var bar = chart.selectAll('g').data(data).enter().append('g').attr('transform', function(d) {
		return 'translate(' + x(d.name) + ',0)'
	})

	bar
		.append('rect')
		.attr('y', function(d) {
			return height - y(d.value)
		})
		.attr('height', function(d) {
			return y(d.value)
		})
		.attr('width', x.bandwidth)

	bar
		.append('text')
		.attr('x', x.bandwidth() / 2)
		.attr('y', function(d) {
			return height - y(d.value) + 3
		})
		.attr('dy', '.75em')
		.text(function(d) {
			return d.value
		})
})
