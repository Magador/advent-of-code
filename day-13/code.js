var input = document.querySelector('pre').textContent.split('\n');
input.pop();

getBestArrangement(input);

function getBestArrangement (relations) {
	var relationList = getRelations(),
		persons = generatePersons(),
		// relationList = addYourself(), // Part 2
		tables = generateHappiness(),
		globalHappiness = 0;

	console.log(relationList, persons, tables);

	for(var i in tables) {
		var table = tables[i];
		if(table.happiness > globalHappiness)
			globalHappiness = table.happiness;
	}

	return globalHappiness;

	function getRelations () {
		rts = {};
		for(var i in relations) {
			var keywords = /(\w*) would (\w*) (\d*) happiness units by sitting next to (\w*)\./g.exec(relations[i]);
			rts[keywords[1]] = rts[keywords[1]] || {};
			rts[keywords[1]][keywords[4]] = keywords[2] == "gain" ? +keywords[3]: -keywords[3];
		}
		return rts;
	}

	function generatePersons () {
		var pls = [];
		for(var i in relationList)
			pls.push(i);
		return pls;
	}

	// Part 2
	function addYourself () {
		relationList.You = {};
		for(var i in persons)
			relationList[persons[i]].You = relationList.You[persons[i]] = 0;
		persons.push("You");
		return relationList;
	}

	function generateHappiness () {
		var tables = generateTables(persons);

		for (var i = 0; i < tables.length; i++) {
			var table = tables[i];
			table.happiness = 0;
			for (var j = 0; j < table.length; j++) {
				table.happiness += relationList[table[j]][table[(j+1) % table.length]];
				table.happiness += relationList[table[(j+1) % table.length]][table[j]];
			};
		};

		return tables;

		function generateTables(attendees) {
			if(attendees.length == 1)
				return [attendees];
			else {
				var tbls = [];
				for(var i in attendees) {
					var attendee = attendees[i],
							remaining = Array.from(attendees);
							remaining.splice(i, 1);
							
					var subseqs = generateTables(remaining);
					
					for(var j in subseqs) {
						subseqs[j].unshift(attendee);
						tbls.push(subseqs[j]);
					}
				}
				return tbls;
			}
		}
	}
}