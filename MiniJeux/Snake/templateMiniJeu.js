import MiniJeu from '../MiniJeu.js'

export default class SnakeJeu extends MiniJeu {
    constructor(canvas, ctx, tailleX, tailleY) {
        super(canvas, ctx, tailleX, tailleY);

        this.score = 0

        this.background = new Image()
        this.background.src = 'background.png'

        this.foodImg = new Image()
        this.foodImg.src = 'food.png'

        this.eatAudio = new Audio()
        this.eatAudio.src = 'eat.mp3'

        this.deadAudio = new Audio()
        this.deadAudio.src = 'dead.mp3'

        this.unit = 30

        this.timer = 0;

        this.scoreSpan = document.getElementById("SnakeScore");

        this.food = {
            x: Math.floor(Math.random() * 19 + 1) * this.unit,
            y: Math.floor(Math.random() * 19 + 1) * this.unit
        }

        this.snake = []
        this.snake[0] = {
            x: 10 * this.unit,
            y: 10 * this.unit
        }

        this.d

        document.addEventListener('keydown', (e) => {
            if (e.keyCode == 37 && this.d != "R") {
                this.d = "L"
            }
            else if (e.keyCode == 38 && this.d != "D") {
                this.d = "U"
            }
            else if (e.keyCode == 39 && this.d != "L") {
                this.d = "R"
            }
            else if (e.keyCode == 40 && this.d != "U") {
                this.d = "D"
            }
        })
    }

    collisionBody(head, snake) {
        for (let index = 0; index < snake.length; index++) {
            if (head.x == snake[index].x && head.y == snake[index].y) {
                return true
            }

        }
        return false
    }

    Update() {
        this.timer++;

        this.ctx.drawImage(this.background, 0, 0)

        for (let index = 0; index < this.snake.length; index++) {

            this.ctx.fillStyle = "rgb(255, " + index * 20 + ", " + index * 20 + ")";

            this.ctx.fillRect(this.snake[index].x, this.snake[index].y, this.unit, this.unit)
            this.ctx.strokeStyle = 'red'
            this.ctx.strokeRect(this.snake[index].x, this.snake[index].y, this.unit, this.unit)

        }

        this.ctx.drawImage(this.foodImg, this.food.x, this.food.y)

        let snakeX = this.snake[0].x
        let snakeY = this.snake[0].y


        if (this.timer > 8) {
            this.timer = 0;

            //manger la pomme
            if (snakeX == this.food.x && snakeY == this.food.y) {
                this.food = {
                    x: Math.floor(Math.random() * 19 + 1) * this.unit,
                    y: Math.floor(Math.random() * 19 + 1) * this.unit
                }
                this.score += 1
                this.eatAudio.play()
            }
            else {
                this.snake.pop()
            }


            if (this.d == "L") snakeX -= this.unit
            if (this.d == "U") snakeY -= this.unit
            if (this.d == "R") snakeX += this.unit
            if (this.d == "D") snakeY += this.unit

            let newHead = {
                x: snakeX,
                y: snakeY
            }

            //les collisions
            if (snakeX <= -this.unit || snakeX >= this.canvas.width || snakeY <= -this.unit || snakeY >= this.canvas.height || this.collisionBody(newHead, this.snake)) {
                this.deadAudio.play()
                this.textGagne = "Perdu !\nTu t'es pris un mur ou ta queue !\nScore : " + this.score;
                this.Gagne();
            }
            this.snake.unshift(newHead)
            this.scoreSpan.textContent = this.score
        }
    }
}