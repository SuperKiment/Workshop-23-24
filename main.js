import MemoireJeu from "./MiniJeux/Memoire/templateMiniJeu.js";

var canvas = document.getElementById("MiniJeu");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth*0.5;
ctx.canvas.height = window.innerHeight*0.9;

var t = new MemoireJeu(canvas = canvas, ctx = ctx);


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    t.Update();
}

setInterval(draw, 10);