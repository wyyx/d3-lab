import './styles.scss'
import * as d3 from 'd3'

var matrix = [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 7 ], [ 8, 9, 10, 11 ], [ 12, 13, 14, 15 ] ]

var tr = d3.selectAll('tbody tr').data(matrix)

var td = tr
	.selectAll('td')
	.data(function(d, i) {
		console.log('d', d)
		console.log('i', i)
		// matrix[i]
		return d
	})
	.text(function(d) {
		// matrix[i][i]
		return d
	})
