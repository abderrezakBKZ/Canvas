// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Shape.prototype.paint = function (ctx, canvas) {
  ctx.lineWidth = this.thickness;
  ctx.strokeStyle = this.color;
};

Rectangle.prototype.paint = function (ctx, canvas) {
  Shape.prototype.paint.call(this, ctx, canvas);
  ctx.strokeRect(this.x, this.y, this.w, this.h);
};

Line.prototype.paint = function (ctx, canvas) {
  Shape.prototype.paint.call(this, ctx, canvas);
  ctx.beginPath();
  ctx.moveTo(this.x1, this.y1);
  ctx.lineTo(this.x2, this.y2);
  ctx.stroke();
};

Drawing.prototype.paint = function (ctx, canvas) {
  ctx.fillStyle = "#F0F0F0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let shape of this.shapes) {
    shape.paint(ctx, canvas);
  }
};

Drawing.prototype.updateShapeList = function (ctx, canvas) {
  shapeList = document.getElementById("shapeList");
  shapeList.textContent = "";
  for (let [index, shape] of this.shapes.entries()) {
    let li = document.createElement("li");
    li.style.color = shape.color;

    let button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn", "btn-default");

    let span = document.createElement("span");
    span.classList.add("glyphicon", "glyphicon-remove-sign");
    button.append(span);

    button.addEventListener("click", (event) => {
      this.shapes.splice(index, 1);
      this.paint(ctx, canvas);
      this.updateShapeList(ctx, canvas);
    });

    li.append(button);

    let textNode = document.createTextNode(shape.toString());
    li.append(textNode);
    shapeList.append(li);
  }
};
