function filterNaughty (input) {
	var strings = input.split(':'),
		nice = 0;

	for(var i in strings) {
		var string = strings[i],
			vowels = /(?:[aeiou][^aeiou]*){3,}/g,
			doubleLetters = /(.)\1/g,
			naughtyPairs = /(ab|cd|pq|xy)+/g;
		if(vowels.test(string) && doubleLetters.test(string) && !naughtyPairs.test(string))
			nice++;
	}

	return nice;
}

function filterNewRules (input) {
	var strings = input.split(':'),
		nice = 0;

	for(var i in strings) {
		var string = strings[i],
			pairs = /(.{2}).*\1/g,
			sandwich = /(.).\1/g;
		if(pairs.test(string) && sandwich.test(string))
			nice++;
	}

	return nice;
}