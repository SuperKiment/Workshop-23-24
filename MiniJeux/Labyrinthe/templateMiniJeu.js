import MiniJeu from '../MiniJeu.js'

var directions = {
    rouge: null,
    orange: null,
    violet: null,
    jaune: null,
}

function defDirection(couleur, direction) {
    directions[couleur] = direction;
}


export default class LabyrintheJeu extends MiniJeu {
    /*
    Fonction "Gagne()" pour dire qu'on a gagné, exemple:
        if (sorti du labyrinthe) {
            Gagne();
        }
    Et le jeu s'arrêtera.
    */

    constructor(canvas, ctx, tailleX, tailleY) {
        super(canvas, ctx, tailleX, tailleY);
        this.x = 340
        this.y = 450;
        this.dx = 0;
        this.dy = -1;



        this.grid = [
            [0, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1],
            [6, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
            [0, 5, 5, 5, 0, 2, 0, 1, 1, 0, 1],
            [0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 1],
            [0, 2, 0, 1, 0, 2, 1, 1, 1, 1, 1],
            [0, 2, 0, 1, 4, 3, 3, 3, 1, 1, 1],
            [0, 2, 0, 1, 4, 0, 0, 0, 1, 1, 1],
            [0, 2, 0, 1, 4, 0, 2, 0, 1, 1, 1],
            [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0],
            [0, 2, 3, 3, 3, 3, 1, 1, 1, 1, 1]
        ];


        this.couleursAffichage = ["white", "black", "red", "purple", "yellow", "orange", "grey"]
        this.couleursInterface = ["blanc", "noir", "rouge", "viollet", "jaune", "orange", "gris"]

        let couleurs = ["Rouge", "Violet", "Orange", "Jaune"];
        let directs = ["Droite", "Gauche", "Bas", "Haut"];

        for (let i = 0; i < couleurs.length; i++) {
            let couleur = couleurs[i];
            for (let j = 0; j < directs.length; j++) {
                let dir = directs[j];

                console.log("Btn" + couleur + dir);
                document.getElementById("Btn" + couleur + dir).addEventListener("click", function () {
                    defDirection(couleur.toLowerCase(), dir.toLowerCase());
                });
            }
        }
    }





    calculerChangementDirection(direction) {
        if (direction == "haut") return { x: 0, y: -1 };
        if (direction == "bas") return { x: 0, y: 1 };
        if (direction == "droite") return { x: 1, y: 0 };
        if (direction == "gauche") return { x: -1, y: 0 };
    }





    AfficherLabyrinthe() {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[0].length; y++) {
                const cellValue = this.grid[x][y];

                this.ctx.beginPath();
                this.ctx.rect(x * 40, y * 40, 40, 40);
                this.ctx.fillStyle = this.couleursAffichage[cellValue];
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }

    drawBall(px, py, taille, color, pinceau) {
        this.ctx.beginPath();
        this.ctx.arc(px, py, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.closePath();
    }



    checkCollision(x, y) {
        // Calculer les indices de la cellule actuelle du joueur
        const checkX = x + (20 * this.dx);
        const checkY = y + (20 * this.dy);

        const cellX = Math.floor(checkX / 40);
        const cellY = Math.floor(checkY / 40);


        return this.grid[cellX][cellY];
    }

    Update() {
        this.y += this.dy;
        this.x += this.dx;

        if (this.y < 0) {
            this.y = this.canvas.height;
        }

        if (this.x < 0) {
            this.x = canvas.width;
        }

        this.AfficherLabyrinthe();

        // Vérifier la collision avec le mur noir
        let collisionType = this.checkCollision(this.x, this.y);

        if (this.couleursInterface[collisionType] == "noir") {
            this.x = 340;
            this.y = 450;
            this.dy = -1;
            this.dx = 1;
        }

        if (this.couleursInterface[collisionType] == "gris") {
            this.Gagne()
        }

        if (this.couleursInterface[collisionType] == "rouge") {
            let changement = this.calculerChangementDirection(directions["rouge"]);
            this.dx = changement.x;
            this.dy = changement.y;
        }

        if (this.couleursInterface[collisionType] == "viollet") {
            let changement = this.calculerChangementDirection(directions["violet"]);
            this.dx = changement.x;
            this.dy = changement.y;
        }

        if (this.couleursInterface[collisionType] == "jaune") {
            let changement = this.calculerChangementDirection(directions["jaune"]);
            this.dx = changement.x;
            this.dy = changement.y;
        }

        if (this.couleursInterface[collisionType] == "orange") {
            let changement = this.calculerChangementDirection(directions["orange"]);
            this.dx = changement.x;
            this.dy = changement.y;
        }

        this.drawBall(this.x, this.y, this.taille, this.color, this.pinceau);
    }
}