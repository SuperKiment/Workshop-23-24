import MemoireJeu from "./MiniJeux/Memoire/templateMiniJeu.js";
import TemplateMiniJeu from "./MiniJeux/templateMiniJeu/templateMiniJeu.js";
import ResultatsJeu from "./MiniJeux/Resultats/templateMiniJeu.js";
import SnakeJeu from "./MiniJeux/Snake/templateMiniJeu.js";
import LabyrintheJeu from "./MiniJeux/Labyrinthe/templateMiniJeu.js";
import UI from "./UI/UI.js";
import GameManager from "./GameManager/GameManager.js";

var canvasMiniJeu = document.getElementById("MiniJeu");
var canvasHUD = document.getElementById("HUD");

var ctxMiniJeu = canvasMiniJeu.getContext("2d");
var ctxHUD = canvasHUD.getContext("2d");

ctxMiniJeu.canvas.width = window.innerWidth * 0.5;
ctxMiniJeu.canvas.height = window.innerHeight * 0.9;


ctxHUD.canvas.width = window.innerWidth;
ctxHUD.canvas.height = 300;

var ui = new UI(ctxHUD.canvas, ctxHUD);

for (let i=1; i<6; i++) document.getElementById("rand"+i).innerHTML = Math.round(Math.random()*50+50);

var miniJeux = {
    "Memoire": MemoireJeu,
    "Template": TemplateMiniJeu,
    "Labyrinthe": LabyrintheJeu,
    "Snake": SnakeJeu,
    "Resultats": TemplateMiniJeu,
}

GameManager.Setup(miniJeux, ctxMiniJeu);

function draw() {
    ui.Update();


    //Minijeu
    ctxMiniJeu.clearRect(0, 0, canvasMiniJeu.width, canvasMiniJeu.height);
    ctxMiniJeu.beginPath();
    ctxMiniJeu.rect(10, 10, canvasMiniJeu.width - 20, canvasMiniJeu.height - 20);
    ctxMiniJeu.fillStyle = "rgb(240, 240, 240)";
    ctxMiniJeu.fill();
    ctxMiniJeu.closePath();

    if (GameManager.runningGame != null) {
        GameManager.runningGame.Update();
    }
}

setInterval(draw, 10);