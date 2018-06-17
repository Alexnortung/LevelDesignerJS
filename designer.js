function Designer() {
	this.mapSize = new Vector(32,32);
	this.blocks = [
		{id:0, color:"#000000"},
		{id:1, color:"#ffffff"}
	];

	this.selectedBlock = 1;

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
	console.log("moving", dx, dy);

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



};
