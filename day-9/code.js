var input = document.querySelector('pre').textContent.split('\n');
input.pop();

getShortestRoute(input);

function getShortestRoute(distances) {
	var routes = getDistances(),
		places = generatePlaces(),
		routesDistances = generateDistances(),
		// distance = Infinity; // Part 1
		distance = 0; // Part 2

	for(var i in routesDistances) {
		var route = routesDistances[i];
		// if(route.distance < distance) // Part 1
		if(route.distance > distance) // Part 2
			distance = route.distance;
	}

	return distance;

	function getDistances () {
		rts = {};
		for(var i in distances) {
			var keywords = /(\w*) to (\w*) = (\d*)/g.exec(distances[i]);
			rts[keywords[1]] = rts[keywords[1]] || {
				to: {}
			};
			rts[keywords[1]].to[keywords[2]] = +keywords[3];
			rts[keywords[2]] = rts[keywords[2]] || {
				to: {}
			};
			rts[keywords[2]].to[keywords[1]] = +keywords[3];
		}
		return rts;
	}

	function generatePlaces () {
		var pls = [];
		for(var i in routes)
			pls.push(i);
		return pls;
	}

	function generateDistances () {
		var trips = generateTrips(places);

		for (var i = 0; i < trips.length; i++) {
			var trip = trips[i];
			trip.distance = 0;
			for (var j = 0; j < trip.length - 1; j++) {
				trip.distance += routes[trip[j]].to[trip[j+1]];
			};
		};

		return trips;

		function generateTrips(cities) {
			if(cities.length == 1)
				return [cities];
			else {
				var trps = [];
				for(var i in cities) {
					var city = cities[i],
							remaining = Array.from(cities);
							remaining.splice(i, 1);
							
					var subseqs = generateTrips(remaining);
					
					for(var j in subseqs) {
						subseqs[j].unshift(city);
						trps.push(subseqs[j]);
					}
				}
				return trps;
			}
		}
	}
}