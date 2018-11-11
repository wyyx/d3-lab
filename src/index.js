import './styles.scss'
import * as d3 from 'd3'

d3.json('data.json').then((nodeData, error) => {
	if (error) throw error

	var width = 500 // <-- 1
	var height = 500
	var radius = Math.min(width, height) / 2 // < -- 2
	var color = d3.scaleOrdinal(d3.schemePuOr[11]) // <-- 3

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
		.selectAll('g') // <-- 1
		.data(root.descendants())
		.enter()
		.append('g')
		.attr('class', 'node') // <-- 2
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

	// Add a Label for Each Node
	g
		.selectAll('.node') // <-- 1
		.append('text') // <-- 2
		.attr('transform', function(d) {
			return 'translate(' + arc.centroid(d) + ')rotate(' + computeTextRotation(d) + ')'
		}) // <-- 3
		.attr('dy', '.3em') // <-- 5
		.attr('text-anchor', 'middle') // <-- 5
		.text(function(d) {
			return d.parent ? d.data.name : ''
		}) // <-- 6

	function computeTextRotation(d) {
		var angle = (d.x0 + d.x1) / Math.PI * 90 // <-- 1

		// Avoid upside-down labels
		return angle < 90 || angle > 270 ? angle : angle + 180 // <--2 "labels aligned with slices"

		// // Alternate label formatting
		// return angle < 180 ? angle - 90 : angle + 90 // <-- 3 "labels as spokes"
	}
})
