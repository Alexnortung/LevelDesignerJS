var designer;
var sideLength;
var canvas;
var pgBackground;
var pg;
var pgGrid;
var canvasSize = new Vector(800,800);


function setup() {
	//creating canvas
	canvas = createCanvas(canvasSize.x, canvasSize.y);

	//creating graphics
	pg = createGraphics(canvasSize.x, canvasSize.y);
	pgBackground = createGraphics(canvasSize.x, canvasSize.y);
	pgGrid = createGraphics(canvasSize.x, canvasSize.y);

	//putting the canvas into the canvasContainer
	$(canvas.canvas.id).appendTo("#canvasContainer");

	//canvas right clicks will not open contect menu
	canvas.canvas.oncontextmenu = function() {
    return false;
	}

	//instantiating designer class
	designer = new Designer();

	//renderBackground after instantiating designer.
	renderBackground();

	renderGrid();

}

function renderBackground() {
	pgBackground.background("#fff");
	for (var x = designer.map.length - 1; x >= 0; x--) {
		for (var y = designer.map.length - 1; y >= 0; y--) {
			var b = designer.map[x][y];
			var bVector = new Vector(x,y);
			bVector.multiplyBy(designer.drawScale);
			bVector = designer.getNewPos(bVector);
			pgBackground.push();
			pgBackground.fill(
				color(designer.blocks[b].color)
			);
			// if (!designer.showGrid) {
			// 	pgBackground.noStroke();
			// } else {
			// 	pgBackground.stroke(100);
			// }

			pgBackground.rect(bVector.x, bVector.y, designer.drawScale, designer.drawScale);

			pgBackground.pop();
		}
	}
}

function renderGrid() {
	pgGrid.push();
	pgGrid.stroke(color(designer.gridColor));
	for (var x = 1; x < designer.mapSize.x; x++) {
		var cX =  x * designer.drawScale;
		pgGrid.line(cX , 0,
			cX, designer.mapSize.y * designer.drawScale);
	}
	for (var y = 1; y < designer.mapSize.x; y++) {
		var cY =  y * designer.drawScale;
		pgGrid.line(0, cY,
			designer.mapSize.x * designer.drawScale, cY);
	}
	pgGrid.pop();
}



function draw() {
	image(pgBackground,0,0);
	if (designer.showGrid) {
		image(pgGrid,0,0);
	}


	sideLength = designer.drawScale;

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
			stroke(designer.mouseStrokeColor);
			line(mouseBlockVector.x, 0, mouseBlockVector.x, designer.mapSize.x * designer.drawScale);
			line(mouseBlockVector.x + sideLength, 0, mouseBlockVector.x + sideLength, designer.mapSize.x * designer.drawScale);


			//vertical-lines
			line(0, mouseBlockVector.y, designer.mapSize.y * designer.drawScale, mouseBlockVector.y);
			line(0, mouseBlockVector.y + sideLength, designer.mapSize.y * designer.drawScale, mouseBlockVector.y + sideLength);

			pop();
		}



		//stroke the block at the mosue
		push();
		stroke(designer.mouseStrokeColor);
		var b = designer.map[mouseBlockX][mouseBlockY];
		fill(
			color(designer.blocks[b].color)
		);
		rect(mouseBlockVector.x, mouseBlockVector.y, sideLength, sideLength);

		pop();
	}


	designer.selectedTool.draw();

	/* // line that follows mouse
	push();
	stroke(255,50,50)
	line(mouseX,mouseY,pmouseX,pmouseY);
	pop();*/

	//draw all createGraphics



	image(pg,0,0);

}

function mousePressed() {

	if (mouseButton === RIGHT) {
      designer.selectedTool.deactivate();
  } else if (mouseButton === LEFT) {
  	designer.selectedTool.mousePress();
  }

	/*
	var mouseBlockX = Math.floor((mouseX + designer.position.x) / sideLength);
	var mouseBlockY = Math.floor((mouseY + designer.position.y) / sideLength);

	//console.log("mouse pressed at ", mouseBlockX, mouseBlockY);

	if (mouseBlockX >= 0 && mouseBlockX < designer.mapSize.x &&
		mouseBlockY >= 0 && mouseBlockY < designer.mapSize.y ) {

		designer.placeBlock(mouseBlockX, mouseBlockY);
		//console.log("block placed at ", mouseBlockX, mouseBlockY);

	}*/
}

function mouseDragged() {

	designer.selectedTool.mouseDrag();
}

function mouseReleased() {

	designer.selectedTool.mouseRelease();
}
