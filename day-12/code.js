var input = document.querySelector('pre').textContent;

getSum(JSON.parse(input));

function getSum (o) {
	var sum = 0;
	if(typeof o == 'number')
		sum = o;
	if(typeof o == 'object')
		for(var i in o) {
			// if(o[i] == "red" && isNaN(parseInt(i))) { // Part 2
			// 	sum = 0;
			// 	break;
			// }
			// else
				sum += getSum(o[i]);
		}

	return sum;
}