function computeArea(string) {
	var dimensions = string.split("\n");
	var boxes = [];
	for(var i in dimensions) {
		var lengths = dimensions[i].split('x');
		boxes.push({
			l: parseInt(lengths[0]),
			w: parseInt(lengths[1]),
			h: parseInt(lengths[2])
		})
	}

	function getBoxArea(box) {
		var wh = box.w * box.h,
			hl = box.h * box.l,
			wl = box.w * box.l,
			plus = Math.min(wh, hl, wl);
		return box.area = 2*wh + 2*hl + 2*wl + plus;
	}

	function getRibbonLength(box) {
		return box.ribbon = box.w*box.h*box.l + 2*(box.w + box.h + box.l) - 2*Math.max(box.w, box.h, box.l);
	}

	var area = 0;
	for(var i in boxes) {
		area += getBoxArea(boxes[i]);
	}

	var ribbon = 0;
	for(var i in boxes) {
		ribbon += getRibbonLength(boxes[i]);
	}

	return {
		area: area,
		ribbon: ribbon
	};
}