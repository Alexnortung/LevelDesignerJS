const undefinedS = "undefined";

function cloneVar(pointer) {
	return JSON.parse(JSON.stringify(pointer));
}
var copyVar = cloneVar;

function getLineArray(x1,y1,x2,y2) {
	var dx = x2-x1;
	var dy = y2-y1;
	var x = x1;
	var y = y1;
	var step;

	var Madx = Math.abs(dx);
	var Mady = Math.abs(dy);

	if (Madx >= Mady ) {
		step = Madx;
	} else {
		step = Mady
	}

	dx = dx / step;
  dy = dy / step;

	i = 0;
	var plots = []
	while(i  <= step) {
		plots.push(new Vector(Math.round(x), Math.round(y)));
		x += dx;
		y += dy;
		i++;
	}
	return plots;
}
