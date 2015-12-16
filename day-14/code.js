var input = document.querySelector('pre').textContent.split('\n');
input.pop();

getWinningReindeer(2053);

function getWinningReindeer (seconds) {
	var reindeers = getReindeers(),
		winningDistance = 0;

	for(var i in reindeers) {
		var distance = getReindeerDistance(reindeers[i])
		if(winningDistance < distance)
			winningDistance = distance;
	}

	return winningDistance;

	function getReindeers () {
		var rds = [];
		for(var i in input) {
			var keywords = /(\w*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds./g.exec(input[i]);
			rds.push({
				name: keywords[1],
				speed: +keywords[2],
				stamina: +keywords[3],
				rest: +keywords[4]
			});
		}
		return rds;
	}

	function getReindeerDistance (reindeer) {
		var remainder = seconds % (reindeer.stamina + reindeer.rest),
			cycleCount = Math.floor(seconds / (reindeer.stamina + reindeer.rest)),
			cycleLength = reindeer.stamina + reindeer.rest;
			distance = cycleCount * reindeer.speed * reindeer.stamina;

		if(remainder - reindeer.stamina > 0) {
			distance += reindeer.speed * reindeer.stamina;
		} else {
			distance += reindeer.speed * (cycleLength - remainder);
		}
		console.log(distance, remainder, cycleCount, cycleLength);
		return distance;
	}
}