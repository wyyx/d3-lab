import './styles.scss'
import * as d3 from 'd3'

var matrix = [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 7 ], [ 8, 9, 10, 11 ], [ 12, 13, 14, 15 ] ]
var theadData = [ 'A', 'B', 'C', 'D' ]

var table = d3.select('body').append('table')

var thead = table.append('thead')
thead.selectAll('th').data(theadData).enter().append('th').text(d => d)

var tbody = table.append('tbody')
var tr = tbody.selectAll('tr').data(matrix).enter().append('tr')
var td = tr.selectAll('td').data(d => d).enter().append('td').text(d => d)
