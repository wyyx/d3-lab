import './styles.scss'
import * as d3 from 'd3'

var td = d3.selectAll('tbody tr').selectAll('td')

td.style('color', function(d, i) {
	console.log('index', i)
	return i ? null : 'red'
})
