import './styles.scss'
import * as d3 from 'd3'

var svg = d3.select('svg')

var data = [32, 57, 112, 293, 34, 77, 88, 234, 56, 20]

function getRandomColor() {
  return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
}

setInterval(() => {
  var circle = svg.selectAll('circle').data(data)

  // remove
  circle.exit().remove()

  // add
  circle
    .enter()
    .append('circle')
    .attr('r', 20)
    .attr('cy', 50)
    .attr('cx', function(d, i) {
      return i * 40 + 20
    })
    .attr('fill', function() {
      return getRandomColor()
    })

  // update
  circle
    .attr('cx', function(d, i) {
      return i * 40 + 20
    })
    .attr('cy', function(d, i) {
      return Math.sqrt(d) + 20
    })

  var newData = Math.random() * 670 + 50
  var needAdd = Math.random() - 0.5 > 0 ? true : false
  var index = Math.floor(Math.random() * data.length)
  console.log('data.length', data.length)

  if (needAdd) {
    data.splice(index, 0, newData)
  } else {
    // keep at least 5 balls
    if (data.length < 5) {
      data.splice(index, 0, newData)
      return
    }

    data.splice(index, 1)
  }
}, 500)
