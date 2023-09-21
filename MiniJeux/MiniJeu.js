import GameManager from "../GameManager/GameManager.js";

export default class MiniJeu {
    constructor(canvas, ctx, tailleX, tailleY) {
        this.canvas = canvas
        this.ctx = ctx;
        this.tailleX = tailleX;
        this.tailleY = tailleY;
        this.textGagne = "Bravo ! Tu as gagné !";
    }

    Update() {

    }

    Gagne() {
        GameManager.UpdateState("Suivant");
        alert(this.textGagne);
    }
}