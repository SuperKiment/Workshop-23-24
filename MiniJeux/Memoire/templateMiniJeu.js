import MiniJeu from '../MiniJeu.js'


export default class MemoireJeu extends MiniJeu {
    /*
    Fonction "Gagne()" pour dire qu'on a gagné, exemple:
        if (sorti du labyrinthe) {
            Gagne();
        }
    Et le jeu s'arrêtera.
    */




    constructor(canvas, ctx, tailleX, tailleY) {
        super(canvas, ctx, tailleX, tailleY);
        this.nombrepaires = 0
        // Définir la taille du carré et des cartes
        this.squareSize = 80;
        this.cardSize = 90;
        var reponse = prompt("Combien de paires voulez-vous ? :");

        if (reponse !== null) {
            reponse = parseInt(reponse);

            if (reponse == 4 || reponse == 6 || reponse == 8) {
                alert("Vous avez entré : " + reponse);
                this.nombrepaires = reponse;
            } else {

                alert("Veuillez entrer 4, 6 ou 8.");
            }
        } else {
            alert("Vous avez annulé la saisie.");
        }


        this.valeur = [];

        if (this.nombrepaires == 4 || this.nombrepaires == 6 || this.nombrepaires == 8) {

            for (let i = 0; i < this.nombrepaires / 2; i++) {
                let temp = [];

                for (let j = 0; j < 4; j++) {
                    temp.push(0);
                }

                this.valeur.push(temp);
            }

            let paires = [];
            for (let i = 1; i <= this.nombrepaires; i++) paires.push(i);


            for (let i = 0; i < paires.length; i++) {

                for (let j = 0; j < 2; j++) {

                    let pose = false;
                    while (!pose) {
                        let x = Math.round(Math.random() * (this.nombrepaires/2-1));
                        let y = Math.round(Math.random() * 3);

                        if (this.valeur[x][y] == 0) {
                            pose = true;
                            this.valeur[x][y] = paires[i];
                        }
                    }
                }
            }
            console.log(this.valeur)


        }
        return
        //Trucs à faire en début de programme
    }


    Update() {// Dessiner les 12 cartes séparées par des espaces
        var aleatoire = 0;

/*

        if (this.nombrepaires == 6) {
            valeur = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
        }
        if (this.nombrepaires == 8) {
            valeur = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
        }

*/
        for (let row = 0; row < this.nombrepaires / 2; row++) {
            for (let col = 0; col < 4; col++) {
                var y = col * (this.squareSize + 20); // Espacement horizontal
                var x = row * (this.squareSize + 20); // Espacement vertical

                this.ctx.fillStyle = "white";
                this.ctx.fillRect(x, y, this.cardSize, this.cardSize);

                // Vous pouvez personnaliser chaque carte ici
                // Par exemple, vous pouvez ajouter du texte ou des images

                this.ctx.strokeStyle = "black";
                this.ctx.strokeRect(x, y, this.cardSize, this.cardSize);
            };
        }
    }
}