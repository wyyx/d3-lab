import './styles.scss'
import * as d3 from 'd3'

class Network {
	constructor() {
		// variables we want to access
		// in multiple places of Network
		this.width = 960
		this.height = 800
		// allData will store the unfiltered data
		this.allData = []
		this.curLinksData = []
		this.curNodesData = []
		this.linkedByIndex = {}
		// these will hold the svg groups for
		// accessing the nodes and links display
		this.nodesG = null
		this.linksG = null
		// these will point to the circles and lines
		// of the nodes and links
		this.node = null
		this.link = null
		// variables to refect the current settings
		// of the visualization
		this.layout = 'force'
		this.filter = 'all'
		this.sort = 'songs'
		// groupCenters will store our radial layout for
		// the group by artist layout.
		this.groupCenters = null

		// our force directed layout
		this.force = d3.layout.force()
		// color function used to color nodes
		this.nodeColors = d3.scale.category20()
		// tooltip used to display details
		this.tooltip = Tooltip('vis-tooltip', 230)
	}

	network(selection, data) {}

	update() {
		// filter data to show based on current filter settings.
		curNodesData = filterNodes(allData.nodes)
		curLinksData = filterLinks(allData.links, curNodesData)

		// sort nodes based on current sort and update centers for
		// radial layout
		if (layout == 'radial') {
			artists = sortedArtists(curNodesData, curLinksData)
			updateCenters(artists)
		}

		// reset nodes in force layout
		force.nodes(curNodesData)

		// enter / exit for nodes
		updateNodes()

		// always show links in force layout
		if (layout == 'force') {
			force.links(curLinksData)
			updateLinks()
		} else {
			// reset links so they do not interfere with
			// other layouts. updateLinks() will be called when
			// force is done animating.
			force.links([])
			// if present, remove them from svg
			if (link) {
				link.data([]).exit().remove()
				link = null
			}
		}

		// start me up!
		force.start()
	}

	toggleLayout(newLayout) {}
}

var myNetwork = new Network()

d3.json('./data/songs.json').then(data => {
	myNetwork.network('//vis', json)
})
