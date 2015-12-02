function rightFloor(string, reg) {
	var len = string.length;
	string = string.replace(reg, "");
	if(len != string.length)
		string = replace(string, reg);
	return string;
}