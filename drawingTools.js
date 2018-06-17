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

LineTool.prototype = Object.create(Tool.prototype);

LineTool.prototype.draw = function () {
  //console.log("line draw");
  if (this.activated) {
    var mouseBlockVector = designer.getMouseBlockVector();
    if (designer.isPositionInside(mouseBlockVector)) {
      //draw outline of the line between the activated point and the mouseBlockVector
      var plots = getLineArray(this.activatedPos.x, this.activatedPos.y, mouseBlockVector.x, mouseBlockVector.y);

      for (var i = 0; i < plots.length; i++) {
        push()
        plots[i].multiplyBy(designer.drawScale);
        stroke(designer.mouseStrokeColor);
        var fillColor = color(designer.blocks[designer.selectedBlock].color)
        fillColor.setAlpha(100);
        fill(fillColor);
        rect(plots[i].x, plots[i].y, designer.drawScale, designer.drawScale);
        pop()

      }


    } else {
      // draw only in the activated posistion
    }

    this.drawStartRect();

  }
};

LineTool.prototype.mousePress = function () {
  var mouseBlockVector = designer.getMouseBlockVector(mouseX, mouseY)
  if (designer.isPositionInside(mouseBlockVector)) {
    if (this.activated) {
      //place line
      designer.placeLine(this.activatedPos.x, this.activatedPos.y, mouseBlockVector.x, mouseBlockVector.y);
      this.deactivate();

    } else {
        this.activate();
    }
  }
};


/*******
RECT TOOL
******/
