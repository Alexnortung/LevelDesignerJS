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

Designer.prototype.move = function (dx, dy) {

	var newPosVector = this.position.add(dx, dy);

	//restrict movement at the end of the level
	var maxX = (this.mapSize.x * this.drawScale) -width;
	var maxY = (this.mapSize.y * this.drawScale) -height;
	var maxPosVetor = new Vector(maxX, maxY);
	if (newPosVector.x > maxPosVetor.x ) {
		newPosVector.x = maxPosVetor.x;
	}
	if (newPosVector.y > maxPosVetor.y) {
		newPosVector.y = maxPosVetor.y;
	}

	//restrict movement to not go behind (0,0)
	if (newPosVector.x < 0 ) {
		newPosVector.x = 0;
	}
	if (newPosVector.y < 0) {
		newPosVector.y = 0;
	}

	this.position = newPosVector;	


};


Designer.prototype.zoom = function (dz) {

};
