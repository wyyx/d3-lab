import './styles.scss'
import * as d3 from 'd3'

var fields = function() {
	var currentTime, hour, minute, second
	currentTime = new Date()
	second = currentTime.getSeconds()
	minute = currentTime.getMinutes()
	hour = currentTime.getHours() + minute / 60

	return [
		{
			unit: 'seconds',
			numeric: second
		},
		{
			unit: 'minutes',
			numeric: minute
		},
		{
			unit: 'hours',
			numeric: hour
		}
	]
}

var width, height, offSetX, offSetY, pi, scaleSecs, scaleMins, scaleHours
width = 400
height = 200
offSetX = 150
offSetY = 100

pi = Math.PI
scaleSecs = d3.scaleLinear().domain([ 0, 59 + 999 / 1000 ]).range([ 0, 2 * pi ])
scaleMins = d3.scaleLinear().domain([ 0, 59 + 59 / 60 ]).range([ 0, 2 * pi ])
scaleHours = d3.scaleLinear().domain([ 0, 11 + 59 / 60 ]).range([ 0, 2 * pi ])

var vis, clockGroup

vis = d3.selectAll('.chart').append('svg').attr('width', width).attr('height', height)

clockGroup = vis.append('g').attr('transform', 'translate(' + offSetX + ',' + offSetY + ')')

clockGroup
	.append('circle')
	.attr('x', 0)
	.attr('y', 0)
	.attr('r', 80)
	.attr('fill', 'none')
	.attr('class', 'clock outercircle')
	.attr('stroke', 'black')
	.attr('stroke-width', 2)

clockGroup.append('circle').attr('r', 4).attr('fill', 'black').attr('class', 'clock innercircle')

function render(data) {
	var hourArc, minuteArc, secondArc

	clockGroup.selectAll('.clockhand').remove()

	secondArc = d3
		.arc()
		.innerRadius(0)
		.outerRadius(70)
		.startAngle(function(d) {
			return scaleSecs(d.numeric)
		})
		.endAngle(function(d) {
			return scaleSecs(d.numeric)
		})

	minuteArc = d3
		.arc()
		.innerRadius(0)
		.outerRadius(70)
		.startAngle(function(d) {
			return scaleMins(d.numeric)
		})
		.endAngle(function(d) {
			return scaleMins(d.numeric)
		})

	hourArc = d3
		.arc()
		.innerRadius(0)
		.outerRadius(50)
		.startAngle(function(d) {
			return scaleHours(d.numeric)
		})
		.endAngle(function(d) {
			return scaleHours(d.numeric)
		})

	clockGroup
		.selectAll('.clockhand')
		.data(data)
		.enter()
		.append('path')
		.attr('d', function(d) {
			if (d.unit === 'seconds') {
				return secondArc(d)
			} else if (d.unit === 'minutes') {
				return minuteArc(d)
			} else if (d.unit === 'hours') {
				return hourArc(d)
			}
		})
		.attr('class', 'clockhand')
		.attr('stroke', 'black')
		.attr('stroke-width', function(d) {
			if (d.unit === 'seconds') {
				return 2
			} else if (d.unit === 'minutes') {
				return 3
			} else if (d.unit === 'hours') {
				return 3
			}
		})
		.attr('fill', 'none')
}

setInterval(function() {
	var data = fields()
	return render(data)
}, 1000)
