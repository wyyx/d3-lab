import './styles.scss'
import * as d3 from 'd3'
import './d3.tsv'

d3.tsv('./d3.tsv').then(function(data) {
	console.log('data', data)

	data.forEach(function(d) {
		d.value = +d.value
	})

	var width = 420,
		barHeight = 20

	var x = d3
		.scaleLinear()
		.domain([
			0,
			d3.max(data, function(d) {
				return d.value
			})
		])
		.range([ 0, width ])

	var chart = d3.select('.chart').attr('width', width).attr('height', barHeight * data.length)

	var bar = chart.selectAll('g').data(data).enter().append('g').attr('transform', function(d, i) {
		return 'translate(0,' + i * barHeight + ')'
	})

	bar
		.append('rect')
		.attr('width', function(d) {
			return x(d.value)
		})
		.attr('height', barHeight - 1)

	bar
		.append('text')
		.attr('x', function(d) {
			return x(d.value) - 3
		})
		.attr('y', barHeight / 2)
		.attr('dy', '.35em')
		.text(function(d) {
			return d.value
		})
})
