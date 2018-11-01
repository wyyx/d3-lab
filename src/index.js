import './styles.scss'
import * as d3 from 'd3'

var svg = d3.select('svg')

var circle = svg.selectAll('circle').data([ 32, 57, 112, 293 ])

var circleEnter = circle.enter().append('circle')

circleEnter.attr('cy', 60)
circleEnter.attr('cx', function(d, i) {
	return i * 100 + 30
})
circleEnter.attr('r', function(d) {
	return Math.sqrt(d)
})

setTimeout(() => {
	var circle = svg.selectAll('circle').data([ 32, 57 ])
	circle.exit().remove()
}, 2000)
