import './styles.scss'
import * as d3 from 'd3'

var svg = d3.select('svg')

var data = [ 32, 57, 112, 293 ]

setInterval(() => {
	var circle = svg.selectAll('circle').data(data)

	// remove
	circle.exit().remove()

	// add and update
	circle
		.enter()
		.append('circle')
		.attr('r', 20)
		.attr('cy', 50)
		.merge(circle)
		.attr('cx', function(d, i) {
			return d
		})

	var newData = Math.random() * 670 + 50
	var needAdd = Math.random() - 0.5 > 0 ? true : false
	var index = Math.floor(Math.random() * data.length)
	console.log('data.length', data.length)

	if (needAdd) {
		data.splice(index, 0, newData)
	} else {
		data.splice(index, 1)
	}
}, 500)
