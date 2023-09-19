export default class UI {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    Update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.rect(10, 10, this.canvas.width - 20, this.canvas.height - 20);
        this.ctx.fillStyle = "aquamarine";
        this.ctx.fill();
        this.ctx.closePath();
    }
}