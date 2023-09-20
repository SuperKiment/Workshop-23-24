import GameManager from "../GameManager/GameManager.js";

export default class UI {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    Update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.rect(10, 10, this.canvas.width - 20, this.canvas.height - 20);
        this.ctx.fillStyle = "rgb(220, 220, 220)";
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.font = "30px monospace";

        this.ctx.fillStyle = "black";
        this.ctx.fillText(GameManager.Coins + " COINS", 50 ,50);
    }
}