// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
  // Définir ici les attributs de la 'classe'
  this.canvas = canvas;
  this.interactor = interactor;
  this.start = { x: 0, y: 0 };
  this.end = { x: 0, y: 0 };

  // Developper les 3 fonctions gérant les événements
  let onmousedown = (event) => {
    this.start.x = this.end.x =
      event.clientX - this.canvas.getBoundingClientRect().x;
    this.start.y = this.end.y =
      event.clientY - this.canvas.getBoundingClientRect().y;
    this.interactor.onInteractionStart(this);
    console.log("down", this.start, this.end);
  };
  let onmousemove = (event) => {
    this.end.x = event.clientX - this.canvas.getBoundingClientRect().x;
    this.end.y = event.clientY - this.canvas.getBoundingClientRect().y;
    this.interactor.onInteractionUpdate(this);
    //console.log("move", this.start, this.end);
  };
  let onmouseup = (event) => {
    this.end.x = event.clientX - this.canvas.getBoundingClientRect().x;
    this.end.y = event.clientY - this.canvas.getBoundingClientRect().y;
    this.interactor.onInteractionEnd(this);
    console.log("up", this.start, this.end);
  };

  // Associer les fonctions précédentes aux évènements du canvas.
  // on met mousemove et mouseup sur la window pour voir les événements hors du canvas
  canvas.addEventListener("mousedown", onmousedown);
  window.addEventListener("mousemove", onmousemove);
  window.addEventListener("mouseup", onmouseup);
}

// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
