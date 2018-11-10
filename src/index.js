import './styles.scss'
import * as d3 from 'd3'

var nodeData = {
	name: 'TOPICS',
	children: [
		{
			name: 'Topic A',
			children: [ { name: 'Sub A1', size: 4 }, { name: 'Sub A2', size: 4 } ]
		},
		{
			name: 'Topic B',
			children: [
				{ name: 'Sub B1', size: 3 },
				{ name: 'Sub B2', size: 3 },
				{
					name: 'Sub B3',
					size: 3
				}
			]
		},
		{
			name: 'Topic C',
			children: [ { name: 'Sub A1', size: 4 }, { name: 'Sub A2', size: 4 } ]
		}
	]
}

var width = 500 // <-- 1
var height = 500
var radius = Math.min(width, height) / 2 // < -- 2
var color = d3.scaleOrdinal(d3.schemeCategory10) // <-- 3

var g = d3
	.select('svg') // <-- 1
	.attr('width', width) // <-- 2
	.attr('height', height)
	.append('g') // <-- 3
	.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')') // <-- 4

var partition = d3
	.partition() // <-- 1
	.size([ 2 * Math.PI, radius ]) // <-- 2

var root = d3
	.hierarchy(nodeData) // <-- 1
	.sum(function(d) {
		return d.size
	}) // <-- 2

partition(root) // <-- 1

var arc = d3
	.arc() // <-- 2
	.startAngle(function(d) {
		return d.x0
	})
	.endAngle(function(d) {
		return d.x1
	})
	.innerRadius(function(d) {
		return d.y0
	})
	.outerRadius(function(d) {
		return d.y1
	})

g
	.selectAll('path') // <-- 1
	.data(root.descendants()) // <-- 2
	.enter() // <-- 3
	.append('path') // <-- 4
	.attr('display', function(d) {
		return d.depth ? null : 'none'
	}) // <-- 5
	.attr('d', arc) // <-- 6
	.style('stroke', '#fff') // <-- 7
	.style('fill', function(d) {
		console.log('color.domain()', color.domain())
		console.log('d', d)
		return color((d.children ? d : d.parent).data.name)
	}) // <-- 8
