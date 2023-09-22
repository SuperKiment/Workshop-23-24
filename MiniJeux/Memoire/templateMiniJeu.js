import GameManager from '../../GameManager/GameManager.js';
import MiniJeu from '../MiniJeu.js'

export default class MemoireJeu extends MiniJeu {
    dessinerCarre(x, y, largeur, hauteur) {
        this.ctx.fillStyle = 'white'; // Couleur du carré
        this.ctx.fillRect(x, y, largeur, hauteur);

    }

    constructor(canvas, ctx, tailleX, tailleY) {
        super(canvas, ctx, tailleX, tailleY);
        this.nombrepaires = 0
        // Définir la taille du carré et des cartes
        this.squareSize = 80;
        this.cardSize = 100;
        this.timer = 0;
        this.cartesAffichees = true;
        var reponse = prompt("Vous allez jouer au Memory !\nCombien de paires voulez-vous ? (4/6/8)");

        this.premierclic = 0;
        this.deuxiemeclic = 0;

        ctx.font = "48px serif";

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


        //ajoute des 0 au tableau
        if (this.nombrepaires == 4 || this.nombrepaires == 6 || this.nombrepaires == 8) {

            for (let i = 0; i < this.nombrepaires / 2; i++) {
                let temp = [];

                for (let j = 0; j < 4; j++) {
                    temp.push(0);
                }

                this.valeur.push(temp);
            }






            let paires = [];
            //crée un tableau avec les paires
            for (let i = 1; i <= this.nombrepaires; i++) paires.push(i);



            //melange aleatoirement les paires dans le tableau
            for (let i = 0; i < paires.length; i++) {

                for (let j = 0; j < 2; j++) {

                    let pose = false;
                    while (!pose) {
                        let x = Math.round(Math.random() * (this.nombrepaires / 2 - 1));
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

        this.carres = [];

        if (reponse == 4) {
            this.carres = [
                { x: 75, y: 75, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 75, y: 150, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 75, y: 225, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 75, y: 300, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 75, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 150, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 225, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 300, largeur: 75, hauteur: 75, chiffre_affiche: false },

            ];
        }

        if (reponse == 6) {
            this.carres = [
                { x: 75, y: 75, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 75, y: 150, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 75, y: 225, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 75, y: 300, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 75, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 150, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 225, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 300, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 225, y: 75, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 225, y: 150, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 225, y: 225, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 225, y: 300, largeur: 75, hauteur: 75, chiffre_affiche: false },

            ];
        }

        if (reponse == 8) {
            this.carres = [
                { x: 75, y: 75, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 75, y: 150, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 75, y: 225, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 75, y: 300, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 75, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 150, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 225, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 150, y: 300, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 225, y: 75, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 225, y: 150, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 225, y: 225, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 225, y: 300, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 300, y: 75, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 300, y: 150, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 300, y: 225, largeur: 75, hauteur: 75, chiffre_affiche: false },
                { x: 300, y: 300, largeur: 75, hauteur: 75, chiffre_affiche: false },

            ];
        }

        function onclick(event) {
            if (GameManager.etape == 1) {
                const rect = canvas.getBoundingClientRect(); // Obtient la position du canvas sur la page
                const xClic = event.clientX - rect.left; // Position horizontale du clic
                const yClic = event.clientY - rect.top; // Position verticale du clic

                let gagne = true;

                // Vérifiez si le clic est à l'intérieur de l'un des carrés
                for (const carre of this.carres) {
                    if (
                        xClic >= carre.x &&
                        xClic <= carre.x + carre.largeur &&
                        yClic >= carre.y &&
                        yClic <= carre.y + carre.hauteur
                    ) {

                        if (this.premierclic == 0) {
                            this.premierclic = carre
                            carre.chiffre_affiche = true;
                        } else {
                            this.deuxiemeclic = carre

                            if (this.premierclic == this.deuxiemeclic) {
                                this.premierclic.chiffre_affiche = false;
                                this.deuxiemeclic.chiffre_affiche = false;
                                this.premierclic = 0;
                                this.deuxiemeclic = 0;
                            } else {
                                if (this.premierclic.val === this.deuxiemeclic.val) {
                                    carre.chiffre_affiche = true;
                                    this.premierclic = 0;
                                    this.deuxiemeclic = 0;
                                } else {
                                    this.premierclic.chiffre_affiche = false;
                                    this.deuxiemeclic.chiffre_affiche = false;
                                    this.premierclic = 0;
                                    this.deuxiemeclic = 0;

                                }
                            }
                        }
                    }

                    if (!carre.chiffre_affiche) {
                        gagne = false;
                    }


                }
                if (gagne) this.Gagne();

            }
        }
        console.log(this.valeur);

        
        //placer les chiffres dans les carrés
        for (let i = 0; i < this.carres.length; i++) {
            let carre = this.carres[i];

            this.carres[i]["val"] = this.valeur[carre.x / 75 - 1][carre.y / 75 - 1];
        };

        console.log(this.carres);

        canvas.addEventListener('click', onclick.bind(this));

        return
    }

    Update() {// Dessiner les 12 cartes séparées par des espaces
        var aleatoire = 0;
        this.timer += 1;
        if (this.timer > 500) {
            this.timer = 0
            this.cartesAffichees = false;
        }

        this.carres.forEach(carre => {
            this.dessinerCarre(carre.x, carre.y, carre.largeur, carre.hauteur, carre.numero);
            if (this.cartesAffichees || carre.chiffre_affiche) {

                this.ctx.fillStyle = 'black'
                this.ctx.fillText(this.valeur[carre.x / 75 - 1][carre.y / 75 - 1], carre.x + 20, carre.y + 60);
            }
        });
    }
}