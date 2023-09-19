export default class Boule {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.taille = Math.random() * 15;
        this.pinceau = false;

        let dividing = 4;

        this.dx = this.taille / dividing * (Math.random() * 2 - 1);
        this.dy = this.taille / dividing * (Math.random() * 2 - 1);

        this.color = "rgb(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ")";
    }

    drawBall(px, py, taille, color, pinceau) {
        this.ctx.beginPath();
        this.ctx.arc(px, py, taille, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();

        if (pinceau) {
            this.ctx.beginPath();
            this.ctx.arc(px, py + taille, taille, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.beginPath();
            this.ctx.arc(px + taille * 4, py + taille / 1.5, taille / 1.5, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.beginPath();
            this.ctx.rect(px, py, taille * 4, taille * 1.5);
            this.ctx.fillStyle = color;
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    Update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x > this.canvas.width) {
            this.x = 0;
        }

        if (this.x < 0) {
            this.x = this.canvas.width;
        }

        if (this.y > this.canvas.height) {
            this.y = 0;
        }

        if (this.y < 0) {
            this.y = this.canvas.height;
        }


        this.drawBall(this.x, this.y, this.taille, this.color, this.pinceau);
    }


}