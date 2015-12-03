function deliverPresents (path) {
	var houses = {
		"0:0": 1
	},
		x = y = 0;

	for (var i = 0; i < path.length; i++) {
		var move = path.charAt(i);
		
		switch(move) {
			case "<":
				x--; break;
			case ">":
				x++; break;
			case "^":
				y--; break;
			case "v":
				y++; break;
		}

		var pos = x +":"+ y;

		if (!houses[pos])
			houses[pos] = 0;
		houses[pos]++;
		
	};

	return houses;
}

function countHappyHouses (houses) {
	var count = 0;
	for(var house in houses) {
		if(houses[house] > 0)
			count++;
	}
	return count;
}

function deliverWithRoboSanta (path) {
	var houses = {
		"0:0": 2
	},
		x1 = x2 = y1 = y2 = 0;

	for (var i = 0; i < path.length; i+=2) {
		var move1 = path.charAt(i),
			move2 = path.charAt(i+1);
		
		switch(move1) {
			case "<":
				x1--; break;
			case ">":
				x1++; break;
			case "^":
				y1--; break;
			case "v":
				y1++; break;
		}

		switch(move2) {
			case "<":
				x2--; break;
			case ">":
				x2++; break;
			case "^":
				y2--; break;
			case "v":
				y2++; break;
		}

		var pos = x1 +":"+ y1;

		if (!houses[pos])
			houses[pos] = 0;
		houses[pos]++;

		pos = x2 +":"+ y2;

		if (!houses[pos])
			houses[pos] = 0;
		houses[pos]++;
		
	};

	return houses;
}