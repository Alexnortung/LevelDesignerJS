var designer;
var sideLength;
var canvas;


function setup() {
	canvas = createCanvas(800,800);
	$(canvas.canvas.id).appendTo("#canvasContainer");
	designer = new Designer();
}


function draw() {
	background("#fff")
	sideLength = designer.drawScale;
	for (var x = designer.map.length - 1; x >= 0; x--) {
		for (var y = designer.map.length - 1; y >= 0; y--) {
			var b = designer.map[x][y];
			var bVector = new Vector(x,y);
			bVector.multiplyBy(sideLength);
			bVector = designer.getNewPos(bVector);
			push();
			fill(
				color(designer.blocks[b].color)
			);
			noStroke();
			rect(bVector.x, bVector.y, sideLength, sideLength);

			pop();
		}

	}
	/*
	if (designer.drawGrid) {
		for (var x = designer.mapSize.x - 2; x > 0; x--) {

		}
	}
	*/

	//stroke the block the mouse is hovering over

	var mouseBlockX = Math.floor((mouseX + designer.position.x) / sideLength);
	var mouseBlockY = Math.floor((mouseY + designer.position.y) / sideLength);
	if (mouseBlockX >= 0 && mouseBlockX < designer.mapSize.x &&
		mouseBlockY >= 0 && mouseBlockY < designer.mapSize.y ) {
		var mouseBlockVector = new Vector(mouseBlockX, mouseBlockY);
		mouseBlockVector.multiplyBy(sideLength);

		mouseBlockVector = designer.getNewPos(mouseBlockVector);

		//console.log(mouseBlockVector.x);





		if (designer.showWires) {
			//console.log("showing wires");

			push();
			//horizontal-lines
			stroke(50,50,255);
			line(mouseBlockVector.x, 0, mouseBlockVector.x, designer.mapSize.x * designer.drawScale);
			line(mouseBlockVector.x + sideLength, 0, mouseBlockVector.x + sideLength, designer.mapSize.x * designer.drawScale);


			//vertical-lines
			line(0, mouseBlockVector.y, designer.mapSize.y * designer.drawScale, mouseBlockVector.y);
			line(0, mouseBlockVector.y + sideLength, designer.mapSize.y * designer.drawScale, mouseBlockVector.y + sideLength);

			pop();
		}



		push();
		stroke(50,50,255);
		var b = designer.map[mouseBlockX][mouseBlockY];
		fill(
			color(designer.blocks[b].color)
		);
		rect(mouseBlockVector.x, mouseBlockVector.y, sideLength, sideLength);

		pop();
	}

}

function mousePressed() {
	var mouseBlockX = Math.floor((mouseX + designer.position.x) / sideLength);
	var mouseBlockY = Math.floor((mouseY + designer.position.y) / sideLength);

	//console.log("mouse pressed at ", mouseBlockX, mouseBlockY);

	if (mouseBlockX >= 0 && mouseBlockX < designer.mapSize.x &&
		mouseBlockY >= 0 && mouseBlockY < designer.mapSize.y ) {

		designer.placeBlock(mouseBlockX, mouseBlockY);
		//console.log("block placed at ", mouseBlockX, mouseBlockY);

	}
}
