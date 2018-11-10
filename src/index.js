import './styles.scss'
import * as d3 from 'd3'

var myData = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

var linearScale = d3.scaleLinear().domain([ 0, 11 ]).range([ 0, 600 ])

var ordinalScale = d3.scaleOrdinal().domain(myData).range([ 'black', '#ccc', '#ccc' ])

d3
	.select('#wrapper')
	.selectAll('text')
	.data(myData)
	.enter()
	.append('text')
	.attr('x', function(d, i) {
		return linearScale(i)
	})
	.text(function(d) {
		return d
	})
	.style('fill', function(d) {
		return ordinalScale(d)
	})
