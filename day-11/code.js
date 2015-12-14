var part1 = nextPassword('vzbxkghb'),
	part2 = nextPassword(part1);

function nextPassword (old) {

	var newPass = incrementPassword(old);

	while(!isConform(newPass))
		newPass = incrementPassword(newPass);

	return newPass;
	
	function incrementPassword (pass) {
		var charCode = pass.charCodeAt(pass.length - 1);
		if(charCode < 122) {
			pass = pass.substring(0, pass.length - 1) + String.fromCharCode(charCode + 1);
		} else {
			var index = 1;
			while((charCode = pass.charCodeAt(pass.length - index)) == 122) {
				index++;
			}
			pass = pass.substring(0, pass.length - index) + String.fromCharCode(charCode + 1);
			while(index > 1) {
				pass += 'a';
				index--;
			}
		}
		return pass;
	}

	function isConform (pass) {
		return containsSuite(pass, 3) && !/[iol]/g.test(pass) && containsPairs(pass);
	}

	function containsSuite (pass, length) {
		for (var i = 0; i <= pass.length - length; i++) {
			if(isSuite(pass.substr(i, length)))
				return true
		};
		return false;

		function isSuite (str) {
			var charCode = str.charCodeAt(0);
			for (var i = 1; i < str.length; i++) {
				if(charCode + i != str.charCodeAt(i))
					return false;
			};
			return true;
		}
	}

	function containsPairs (pass) {
		var pairs = [];
		for (var i = 0; i <= pass.length - 2; i++) {
			if(pairs.indexOf(pass.charAt(i)) == -1 && pass.charAt(i) == pass.charAt(i+1)) {
				pairs.push(pass.charAt(i));
				i++;
			}
		};
		return pairs.length >= 2;
	}
}