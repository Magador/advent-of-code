var input = document.querySelector('pre').textContent.split('\n');
input.pop();

assembleCircuit(input);

function assembleCircuit (instructions) {
	var references = generateReferences(),
		outputs = getOutputs(),
		pairs = getPairs();

	var i = 0;
	while(!allDone()/* && i < 10*/) {
		console.warn(countDone());
		computeValues();
		console.log(pairs.a);
		i++;
	}

	return pairs.a.value;

	function generateReferences () {
		var refs = [];

		instructions.forEach(function(instruction) {
			var keywords = instruction.split(' '),
				ref = {};
			keywords.splice(-2, 1);

			ref.from = {};
			ref.to = keywords.pop();

			switch(keywords.length) {
				case 3:
					ref.from.left = isNaN(+keywords[0])? keywords.shift(): +keywords.shift();
				case 2:
					ref.from.op = keywords.shift();
				case 1:
					ref.from.right = isNaN(+keywords[0])? keywords.shift(): +keywords.shift();
			}

			refs.push(ref);
		});

		return refs;
	}

	function getOutputs () {
		var outs = [];
		references.forEach(function(ref) {
			outs.push(ref.to);
		});
		return outs;
	}

	function getPairs () {
		var ps = {};
		for(var i in outputs) {
			ps[outputs[i]] = {
				value: undefined,
				done: false
			}
		}
		return ps;
	}

	function allDone () {
		return Object.keys(pairs).every(function(ref) {
			return pairs[ref].done;
		});
	}

	function countDone () {
		var count = 0;
		for(var i in pairs) {
			if(pairs[i].done)
				count++;
		}
		return count;
	}

	function computeValues () {
		references.forEach(function(reference) {
			if(!pairs[reference.to].done) {
				var left = undefined,
					right = undefined;

				if(reference.from.left != undefined)
					left = pairs[reference.from.left]? pairs[reference.from.left].value: reference.from.left;

				right = pairs[reference.from.right]? pairs[reference.from.right].value: reference.from.right;

				if(!isNaN(+left) && !isNaN(+right)) {
					if(~~left !== left || ~~right !== right)
						console.error(left, right);
					if(reference.from.op == undefined)
						console.error(reference);
					switch(reference.from.op) {
					case "RSHIFT": 
						pairs[reference.to].value = left >> right;
						break;
					case "OR": 
						pairs[reference.to].value = left | right;
						break;
					case "AND": 
						pairs[reference.to].value = left & right;
						break;
					case "LSHIFT":
						pairs[reference.to].value = left << right;
						break;
					default:
						console.error(reference);
					}
					pairs[reference.to].done = true;
				} else if(!isNaN(+right)) {
					if(reference.from.left == undefined) {
						console.info(reference.from.op);
						if(reference.from.op == "NOT")
							pairs[reference.to].value = ~right;
						else
							pairs[reference.to].value = +right;
						pairs[reference.to].done = true;
					}
				}
			}
		});
	}
}