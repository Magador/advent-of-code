var input = document.querySelector('pre').textContent.split('\n');
input.pop();

getWinningReindeerData(2503);

// Part 1
function getWinningReindeerData (duration) {
	var reindeers = getReindeers(),
		// winningDistance = 0; // Part 1
		winningPoints = 0; // Part 2

	// Part 1
	// for(var i in reindeers) {
	// 	var distance = getReindeerDistance(reindeers[i]);
	// 	if(winningDistance < distance)
	// 		winningDistance = distance;
	// }

	// Part 2
	for (var i = 0; i < duration; i++) {
		nextTick().forEach(function(name) {
			if(++reindeers[name].points > winningPoints)
				winningPoints = reindeers[name].points;
		})
	};

	// return winningDistance; // Part 1
	return winningPoints; // Part 2

	function getReindeers () {
		var rds = {};
		for(var i in input) {
			var keywords = /(\w*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds./g.exec(input[i]);
			rds[keywords[1]] = {
				name: keywords[1],
				speed: +keywords[2],
				stamina: +keywords[3],
				rest: +keywords[4],
				cycleLength: +keywords[3] + +keywords[4],
				points: 0,
				distance: 0,
				resting: false,
				restingLeft: 0,
				flyingLeft: +keywords[3]
			};
		}
		return rds;
	}

	function getReindeerDistance (reindeer) {
		var remainder = duration % reindeer.cycleLength,
			cycleCount = Math.floor(duration / reindeer.cycleLength);
		return reindeer.speed * (cycleCount * reindeer.stamina + Math.min(reindeer.stamina, remainder));;
	}

	function nextTick () {
		var winningReindeers = [],
			winningValue = 0;

		for(var i in reindeers) {
			increment(reindeers[i]);
			if(reindeers[i].distance > winningValue) {
				winningReindeers = [reindeers[i].name];
				winningValue = reindeers[i].distance;
			} else if(reindeers[i].distance == winningValue)
				winningReindeers.push(reindeers[i].name);
		}

		return winningReindeers;

		function increment (reindeer) {
			if(reindeer.resting) {
				if(--reindeer.restingLeft <= 0) {
					reindeer.resting = false;
					reindeer.flyingLeft = reindeer.stamina;
				}
			} else {
				reindeer.distance += reindeer.speed;
				if(--reindeer.flyingLeft <= 0) {
					reindeer.resting = true;
					reindeer.restingLeft = reindeer.rest;
				}
			}
		}
	}
}