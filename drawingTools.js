/*******
INHERIT FUNTION
******/

function Tool() {
  this.activated = false;
  this.activatedPos = new Vector(0,0);



}

Tool.prototype.draw = function () {
  //console.log("t draw");
};

Tool.prototype.drawStartRect = function () {
  push();
  stroke(50,255,50);
  fill(0,0,0,0)
  rect(this.activatedPos.x * designer.drawScale, this.activatedPos.y * designer.drawScale,
    designer.drawScale,designer.drawScale);
  pop();
}

Tool.prototype.mousePress = function () {
  var mouseBlockVector = designer.getMouseBlockVector(mouseX, mouseY);
  if (designer.isPositionInside(mouseBlockVector)) {
    if (this.activated) {
      //draw the selected shape
      this.placeBlocks();
      this.deactivate();

    } else {
        this.activate();
    }
  }
};

Tool.prototype.create = function () {

};

Tool.prototype.outlineBlock = function (pos, y) {
  pos = posYChecker(pos, y);

  push();
  stroke(designer.mouseStrokeColor);
  var fillColor = color(designer.blocks[designer.selectedBlock].color)
  fillColor.setAlpha(100);
  fill(fillColor);
  rect(pos.x, pos.y, designer.drawScale, designer.drawScale);
  pop();

};

Tool.prototype.activate = function () {
  this.activatedPos = designer.getMouseBlockVector();
  this.activated = true
};

Tool.prototype.deactivate = function () {
  this.activated = false;
};


/*******
LINE TOOL
******/

function LineTool() {
  Tool.call(this);

}

// inheriting methods from Tool
LineTool.prototype = Object.create(Tool.prototype);

LineTool.prototype.draw = function () {
  //console.log("line draw");
  if (this.activated) {
    var mouseBlockVector = designer.getMouseBlockVector();
    if (designer.isPositionInside(mouseBlockVector)) {
      //draw outline of the line between the activated point and the mouseBlockVector
      var plots = getLineArray(this.activatedPos.x, this.activatedPos.y, mouseBlockVector.x, mouseBlockVector.y);

      for (var i = 0; i < plots.length; i++) {
        plots[i].multiplyBy(designer.drawScale);
        this.outlineBlock(plots[i]);


        /*push()

        stroke(designer.mouseStrokeColor);
        var fillColor = color(designer.blocks[designer.selectedBlock].color)
        fillColor.setAlpha(100);
        fill(fillColor);
        rect(plots[i].x, plots[i].y, designer.drawScale, designer.drawScale);
        pop();*/

      }


    } else {
      // draw only in the activated posistion
    }

    this.drawStartRect();

  }
};


LineTool.prototype.placeBlocks = function () {
  var mouseBlockVector = designer.getMouseBlockVector(mouseX, mouseY);
  designer.placeLine(this.activatedPos.x, this.activatedPos.y, mouseBlockVector.x, mouseBlockVector.y);
};


/*******
RECT TOOL
******/

function RectTool() {
  Tool.call(this);

}

// inheriting methods from Tool
RectTool.prototype = Object.create(Tool.prototype);

RectTool.prototype.draw = function () {
  if (this.activated) {
    var mouseBlockVector = designer.getMouseBlockVector();
    if (designer.isPositionInside(mouseBlockVector)) {
      var plots = [];
      var minX = Math.min(mouseBlockVector.x, this.activatedPos.x);
      var maxX = Math.max(mouseBlockVector.x, this.activatedPos.x);
      var minY = Math.min(mouseBlockVector.y, this.activatedPos.y);
      var maxY = Math.max(mouseBlockVector.y, this.activatedPos.y);

      for (var i = minX; i <= maxX; i++) {
        for (var j = minY; j <= maxY; j++) {
          var blockVector = new Vector(i, j);
          blockVector.multiplyBy(designer.drawScale);
          this.outlineBlock(blockVector.x, blockVector.y);
        }
      }



    }

    this.drawStartRect();


  }
};

RectTool.prototype.placeBlocks = function () {
  var mouseBlockVector = designer.getMouseBlockVector(mouseX, mouseY);
  designer.placeRect(this.activatedPos.x, this.activatedPos.y, mouseBlockVector.x, mouseBlockVector.y);
};
