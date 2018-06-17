function Designer() {
	this.mapSize = new Vector(32,32);
	this.blocks = [
		{id:0, color:"#000000"},
		{id:1, color:"#ffffff"}
	];

	this.selectedBlock = 1;

	this.tools = [
		"freehand",
		"rectangle",
		"line"
	]

	this.activeTool = this.tools[0];

	//means every block is drawn with drawScale x drawScale pixels
	this.drawScale = 48;
	this.showWires = false;
	this.showGrid = true;
	this.gridColor = "#888888";

	this.position = new Vector(0,0);


	this.createMap();


}

Designer.prototype.placeBlock = function(x, y) {
	if (x >= 0 && x < this.mapSize.x && y >= 0 && y < this.mapSize.y ) {
		this.map[x][y] = cloneVar(this.selectedBlock);
	}
};


Designer.prototype.placeLine = function (x1,y1,x2,y2) {
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
	while(i  <= step) {
		this.placeBlock(x, y);
		x += dx;
		y += dy;
		i++;
	}

};


Designer.prototype.placeRect = function (x, y, x2, y2) {
	var minX = Math.min(x,x2);
	var maxX = Math.max(x,x2);
	var minY = Math.min(y,y2);
	var maxY = Math.max(y,y2);
	for (var i = minX; i <= maxX; i++) {
		for (var j = minY; j <= maxY; j++) {
			this.placeBlock(i,j);
		}

	}


};


Designer.prototype.createMap = function() {
	this.map = []
	for (var i = this.mapSize.x -1; i >= 0; i--) {
		this.map[i] = [];
		for (var j = this.mapSize.y -1; j >= 0; j--) {
			this.map[i][j] = 0;
		}
	}
};

Designer.prototype.getMaxPosVector = function () {
	var maxX = (this.mapSize.x * this.drawScale) -width;
	var maxY = (this.mapSize.y * this.drawScale) -height;
	var maxPosVetor = new Vector(maxX, maxY);
	return maxPosVetor;
};

Designer.prototype.move = function (dx, dy) {
	//console.log("moving", dx, dy);

	var newPosVector = this.position.add(new Vector(dx, dy));

	var maxPosVetor = this.getMaxPosVector();
	//restrict movement at the end of the level

	if (newPosVector.x > maxPosVetor.x ) {
		newPosVector.x = maxPosVetor.x;
	}
	if (newPosVector.y > maxPosVetor.y) {
		newPosVector.y = maxPosVetor.y;
	}

	//restrict movement to not go behind (0,0)
	if (newPosVector.x < 0 ) {
		//console.log("cant move beyond 0 x");
		newPosVector.x = 0;
	}
	if (newPosVector.y < 0) {
		//console.log("cant move beyond 0 y");
		newPosVector.y = 0;
	}

	this.position = newPosVector;


};

Designer.prototype.moveTo = function (pos, y) {
	if (typeof y !== undefinedS && typeof pos !== "object") {
		pos = new Vector(pos, y);
	}

	var maxPosVetor = this.getMaxPosVector();

	if (pos.x > maxPosVetor.x ) {
		pos.x = maxPosVetor.x;
	}
	if (pos.y > maxPosVetor.y) {
		pos.y = maxPosVetor.y;
	}

	//restrict movement to not go behind (0,0)
	if (pos.x < 0 ) {
		//console.log("cant move beyond 0 x");
		pos.x = 0;
	}
	if (pos.y < 0) {
		//console.log("cant move beyond 0 y");
		pos.y = 0;
	}

	this.position = pos;


};


Designer.prototype.getNewPos = function (pos, y) {
	if (typeof y !== undefinedS && typeof pos !== "object") {
		pos = new Vector(pos, y);
	}

	return pos.subtract(this.position);

};


Designer.prototype.zoom = function (dz) {
	//find middle
	var middleX = (width/2) + this.position.x;
	var middleY = (height/2) + this.position.y;
	var middle = new Vector(middleX + middleY);
	middle.divideBy(this.drawScale);

	var newDrawScale = this.drawScale + dz;
	if (newDrawScale < 1) {
		newDrawScale = 1;
	}

	var nb1x = width / this.drawScale;
	var nb2x = width / newDrawScale;
	var nb3x = (nb1x-nb2x)/2;
	var p2x = nb3x * newDrawScale;

	var nb1y = height / this.drawScale;
	var nb2y = height / newDrawScale;
	var nb3y = (nb1y-nb2y)/2;
	var p2y = nb3y * newDrawScale;

	var p1 = this.position.copy();

	var nbp1 = this.position.divide(this.drawScale);
	var newp1 = nbp1.multiply(newDrawScale);


	var p2 = newp1.add(new Vector(p2x, p2y));
	//console.log("p2:", p2, "p1:", p1);

	this.drawScale = newDrawScale;





	this.moveTo(p2);

	//console.log(p1,p2);





};
