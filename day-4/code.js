function mine (key) {
	var hash = "",
		i = 0;
	while(true) {
		hash = md5(key + ++i);
		if(hash.substr(0, 5) === "00000") {
			return i;
		}
	}
}

function mineHarder (key) {
	var hash = "",
		i = 0,
		time = performance.now(),
		timeStamp = 0;;
	while(true) {
		hash = md5(key + ++i);
		if(hash.substr(0, 6) === "000000")
			return i;

		timeStamp = performance.now();
		if(timeStamp - time > 1000) {
			console.log("Current key", key + i);
			time = timeStamp;
		}
	}
}