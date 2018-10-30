import './styles.scss'
import * as d3 from 'd3'

// enter(add)
let ps = d3
	.select('body')
	.selectAll('p')
	.data([ 4, 8, 15, 16, 23, 42 ])
	.enter()
	.append('p')
	.text(function(d) {
		return 'I’m number ' + d + '!'
	})

// update
setTimeout(() => {
	ps.data([ 111, 222, 333 ]).text(function(d) {
		return 'I’m number ' + d + '!'
	})
}, 3000)

// transition
d3
	.selectAll('p')
	.transition()
	.duration(500)
	.delay(function(d, i) {
		return i * 500
	})
	.style('background-color', function(d) {
		return 'lightgreen'
	})

// second enter(add)
setTimeout(() => {
	ps
		.data([ 114, 118, 115, 116, 1123, 1142, 444, 555, 666 ])
		.enter()
		.append('p')
		.text(function(d) {
			return 'I’m number ' + d + '!'
		})
}, 6000)

// remove
setTimeout(() => {
	ps.remove()
}, 9000)
