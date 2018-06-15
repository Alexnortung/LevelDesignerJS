function Designer() {
	this.mapSize = new Vector(32,32);
	this.blocks = [
		{id:0, color:"#000000"}, 
		{id:1, color:"#ffffff"}
	];

	this.selectedBlock = 1;

	//means every block is drawn with 8x8 pixels
	this.drawScale = 24;
	this.showWires = false;
	this.showGrid = true;
	this.gridColor = "#888888";


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