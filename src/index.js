import './styles.scss'
import * as d3 from 'd3'

function gridData() {
	var data = new Array()
	var xpos = 1 //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1
	var width = 50
	var height = 50
	var click = 0

	// iterate for rows
	for (var row = 0; row < 10; row++) {
		data.push(new Array())

		// iterate for cells/columns inside rows
		for (var column = 0; column < 10; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				click: click
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width
		}
		// reset the x position after a row is complete
		xpos = 1
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height
	}
	return data
}

var data = gridData()
// I like to log the data to the console for quick debugging
console.log(data)

var svg = d3.select('#grid').append('svg').attr('width', '510px').attr('height', '510px')

var row = svg.selectAll('g').data(data).enter().append('g').attr('class', 'row')

row
	.selectAll('.square')
	.data(data => data)
	.enter()
	.append('rect')
	.attr('class', 'square')
	.attr('width', d => d.width)
	.attr('height', d => d.height)
	.attr('x', d => d.x)
	.attr('y', d => d.y)
	.style('fill', '#fff')
	.style('stroke', '#222')
	.on('click', function(d) {
		d.click++
		if (d.click % 4 === 0) {
			d3.select(this).style('fill', '#fff')
		}
		if (d.click % 4 === 1) {
			d3.select(this).style('fill', '#2C93E8')
		}
		if (d.click % 4 === 2) {
			d3.select(this).style('fill', '#F56C4E')
		}
		if (d.click % 4 === 3) {
			d3.select(this).style('fill', '#838690')
		}
	})
