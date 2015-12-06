function followInstructions (input) {
	var instructions = getInstructions(),
		lights = generateLights(),
		operations = {
			on: _on,
			off: _off,
			toggle: _toggle
		};

	instructions.forEach(function(instruction) {
		operations[instruction.operation](instruction.from, instruction.through);
	})

	return countLightsOn();

	function getInstructions () {
		var lines = input.split(':'),
			instructions = [];
		for(var i = 0; i < lines.length; i++) {
			var line = lines[i],
				keywords = line.split(' '),
				from = keywords.splice(-3, 1)[0].split(','),
				through = keywords.splice(-1, 1)[0].split(','),
				operation = keywords.splice(-2, 1)[0];

			instructions.push({
				operation: operation,
				from: {
					x: +from[0],
					y: +from[1]
				},
				through: {
					x: +through[0],
					y: +through[1]
				}
			});
		}
		return instructions;
	}

	function generateLights () {
		var lights = Array(1000),
			arr = Array(1000).fill(false);

		for(var i = 0; i < lights.length; i++)
			lights[i] = Object.assign({}, arr);

		return lights;
	}

	function _on (from, through) {
		for(var i = from.x; i <= through.x; i++)
			for(var j = from.y; j <= through.y; j++)
				lights[i][j] = true;
	}

	function _off (from, through) {
		for(var i = from.x; i <= through.x; i++)
			for(var j = from.y; j <= through.y; j++)
				lights[i][j] = false;
	}

	function _toggle (from, through) {
		for(var i = from.x; i <= through.x; i++)
			for(var j = from.y; j <= through.y; j++)
				lights[i][j] = !lights[i][j];
	}

	function countLightsOn () {
		var count = 0;
		for(var i = 0; i < 1000; i++)
			for(var j = 0; j < 1000; j++)
				count += lights[i][j] || 0;
		return count;
	}
}

function followBrightness (input) {
	var instructions = getInstructions(),
		lights = generateLights(),
		operations = {
			on: _on,
			off: _off,
			toggle: _toggle
		};

	glLights = lights;

	instructions.forEach(function(instruction) {
		operations[instruction.operation](instruction.from, instruction.through);
	})

	return computeBrightness();

	function getInstructions () {
		var lines = input.split(':'),
			instructions = [];
		for(var i = 0; i < lines.length; i++) {
			var line = lines[i],
				keywords = line.split(' '),
				from = keywords.splice(-3, 1)[0].split(','),
				through = keywords.splice(-1, 1)[0].split(','),
				operation = keywords.splice(-2, 1)[0];

			instructions.push({
				operation: operation,
				from: {
					x: +from[0],
					y: +from[1]
				},
				through: {
					x: +through[0],
					y: +through[1]
				}
			});
		}
		return instructions;
	}

	function generateLights () {
		var lights = Array(1000),
			arr = Array(1000).fill(0);

		for(var i = 0; i < lights.length; i++)
			lights[i] = Object.assign({}, arr);

		return lights;
	}

	function _on (from, through) {
		for(var i = from.x; i <= through.x; i++)
			for(var j = from.y; j <= through.y; j++)
				lights[i][j]++;
	}

	function _off (from, through) {
		for(var i = from.x; i <= through.x; i++)
			for(var j = from.y; j <= through.y; j++)
				lights[i][j] -= lights[i][j]? 1: 0;
	}

	function _toggle (from, through) {
		for(var i = from.x; i <= through.x; i++)
			for(var j = from.y; j <= through.y; j++)
				lights[i][j] += 2;
	}

	function computeBrightness () {
		var count = 0;
		for(var i = 0; i < lights.length; i++)
			for(var j = 0; j < lights.length; j++) {
				if(lights[i][j] < 0) console.warn(i, j);
				count += lights[i][j];
			}
		return count;
	}
}