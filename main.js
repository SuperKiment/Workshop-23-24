import MemoireJeu from "./MiniJeux/Memoire/templateMiniJeu.js";
import TemplateMiniJeu from "./MiniJeux/templateMiniJeu/templateMiniJeu.js";
import UI from "./UI/UI.js";
import GameManager from "./GameManager/GameManager.js";

var canvasMiniJeu = document.getElementById("MiniJeu");
var canvasHUD = document.getElementById("HUD");

var ctxMiniJeu = canvasMiniJeu.getContext("2d");
var ctxHUD = canvasHUD.getContext("2d");

ctxMiniJeu.canvas.width = window.innerWidth * 0.5;
ctxMiniJeu.canvas.height = window.innerHeight * 0.9;

ctxHUD.font = "15px serif";

ctxHUD.canvas.width = window.innerWidth;
ctxHUD.canvas.height = 300;

var ui = new UI(ctxHUD.canvas, ctxHUD);

var miniJeux = {
    //"Memoire" : new MemoireJeu(canvas = canvas, ctx = ctx),
    "Template": new TemplateMiniJeu(canvasMiniJeu = canvasMiniJeu, ctxMiniJeu = ctxMiniJeu)
}

function draw() {
    ui.Update();
    

    //Minijeu
    ctxMiniJeu.clearRect(0, 0, canvasMiniJeu.width, canvasMiniJeu.height);
    ctxMiniJeu.beginPath();
    ctxMiniJeu.rect(10, 10, canvasMiniJeu.width-20, canvasMiniJeu.height-20);
    ctxMiniJeu.fillStyle = "aquamarine";
    ctxMiniJeu.fill();
    ctxMiniJeu.closePath();

    miniJeux["Template"].Update();
}

setInterval(draw, 10);