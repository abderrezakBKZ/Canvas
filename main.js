var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Code temporaire pour tester le DnD
/*
new DnD(canvas);
ctx.fillStyle = '#F0F0F0'; // set canvas' background color
ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
*/
/////

// Code temporaire pour tester l'affiche de la vue
/*
var rec = new Rectangle(10, 20, 50, 100, 5, '#00CCC0');
var ligne = new Line(10, 20, 50, 100, 5, '#00CCC0');
var dessin = new Drawing();
dessin.shapes.push(rec);
dessin.shapes.push(ligne);
dessin.paint(ctx, canvas);
*/
////

// Nettoyage du formulaire pour correspondre aux valeurs internes
document.forms[0].reset();

// Code final à utiliser pour manipuler Pencil.
var drawing = new Drawing();
var pencil = new Pencil(ctx, drawing, canvas);
drawing.paint(ctx, canvas);
