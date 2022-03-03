var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
  this.ctx = ctx;
  this.drawing = drawing;
  this.canvas = canvas;
  this.currEditingMode = editingMode.line;
  this.currLineWidth = 5;
  this.currColour = "#000000";
  this.currentShape = 0;

  // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
  document.getElementById("butRect").addEventListener("click", (event) => {
    this.currEditingMode = editingMode.rect;
  });
  document.getElementById("butLine").addEventListener("click", (event) => {
    this.currEditingMode = editingMode.line;
  });
  document
    .getElementById("spinnerWidth")
    .addEventListener("change", (event) => {
      this.currLineWidth = event.currentTarget.value;
    });
  document.getElementById("colour").addEventListener("change", (event) => {
    this.currColour = event.currentTarget.value;
  });

  new DnD(canvas, this);

  // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
}

Pencil.prototype.onInteractionStart = function (dnd) {
  switch (this.currEditingMode) {
    case editingMode.line:
      this.currentShape = new Line(
        dnd.start.x,
        dnd.start.y,
        dnd.end.x,
        dnd.end.y,
        this.currLineWidth,
        this.currColour
      );
      break;
    case editingMode.rect:
      this.currentShape = new Rectangle(
        dnd.start.x,
        dnd.start.y,
        dnd.end.x - dnd.start.x,
        dnd.end.y - dnd.start.y,
        this.currLineWidth,
        this.currColour
      );
      break;
    default:
      break;
  }
  this.drawing.paint(this.ctx, this.canvas);
  this.currentShape.paint(this.ctx, this.canvas);
};

Pencil.prototype.onInteractionUpdate = function (dnd) {
  if (this.currentShape != 0) {
    switch (this.currEditingMode) {
      case editingMode.line:
        this.currentShape.x2 = dnd.end.x;
        this.currentShape.y2 = dnd.end.y;
        break;
      case editingMode.rect:
        this.currentShape.w = dnd.end.x - dnd.start.x;
        this.currentShape.h = dnd.end.y - dnd.start.y;
        break;
      default:
        break;
    }
    this.drawing.paint(this.ctx, this.canvas);
    this.currentShape.paint(this.ctx, this.canvas);
  }
};

Pencil.prototype.onInteractionEnd = function (dnd) {
  if (this.currentShape != 0) {
    this.onInteractionUpdate(dnd);
    this.drawing.shapes.push(this.currentShape);
    this.drawing.paint(this.ctx, this.canvas);
    this.drawing.updateShapeList(this.ctx, this.canvas);
    this.currentShape = 0;
  }
};
