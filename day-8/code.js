var input = document.querySelector('pre').textContent.split('\n');
input.pop();

diffStrings(input);

function diffStrings (strings) {
	var literal = 0,
		memory = 0;
	for(var i in strings) {
		/*Part 1*/
		var ms = strings[i].substr(1, strings[i].length-2).replace(/\\{2}/g, '\\').replace(/\\x[0-9a-f]{2}/g, ":").replace(/\\"/g, '\"');

		/* Part 2 */
		// var ms = strings[i].replace(/\\{2}/g, "\\\\\\\\").replace(/\\"(?!$)/g, "\\\\\\\"").replace(/\\x(?=[0-9a-f]{2})/g, "\\\\x").replace(/^\"/g, "\"\\\"").replace(/\"$/g, '\\\"\"');


		literal += strings[i].length;
		memory += ms.length;
	}
	/* Part 1 */
	return literal - memory;
	/* Part 2 */
	// return memory - literal;
}