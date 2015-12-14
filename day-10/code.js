// lookAndSay('1113122113', 40); //Part 1
lookAndSay('1113122113', 50); //Part 2

function lookAndSay (input, times) {
	

	for (var i = 0; i < times; i++) {
		input = sequence();
	};

	return input.length;

	function sequence () {
		var str = '',
			i = 0;
		while(i < input.length) {
			var character = input.charAt(i),
				charIndex = i,
				numChars = 1;
			while(input.charAt(i+1) == character) {
				numChars++;
				i++;
			}
			str += numChars.toString() + character;
			i++;
		};
		return str;
	}
}