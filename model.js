// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

function Drawing() {
  this.shapes = [];
}

function Shape(thickness, color) {
  this.thickness = thickness;
  this.color = color;
}

function Rectangle(x, y, w, h, thickness, color) {
  Shape.call(this, thickness, color);
  [this.x, this.y, this.w, this.h] = [x, y, w, h];
}
Rectangle.prototype = new Shape();
Rectangle.prototype.toString = function () {
  return (
    "Rectangle(" + this.x + ", " + this.y + ", " + this.w + ", " + this.h + ")"
  );
};

function Line(x1, y1, x2, y2, thickness, color) {
  Shape.call(this, thickness, color);
  [this.x1, this.y1, this.x2, this.y2] = [x1, y1, x2, y2];
}
Line.prototype = new Shape();
Line.prototype.toString = function () {
  return (
    "Line(" + this.x1 + ", " + this.y1 + ", " + this.x2 + ", " + this.y2 + ")"
  );
};
