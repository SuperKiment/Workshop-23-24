import Boule from './Boule.js';
import MiniJeu from '../MiniJeu.js'

export default class TemplateMiniJeu extends MiniJeu {
    /*
    Fonction "Gagne()" pour dire qu'on a gagné, exemple:
        if (sorti du labyrinthe) {
            Gagne();
        }
    Et le jeu s'arrêtera.
    */

    constructor(canvas, ctx, tailleX, tailleY) {
        super(canvas, ctx, tailleX, tailleY);

        //Trucs à faire en début de programme
        this.allBoules = []
        for (let i = 0; i < 50; i++) {
            this.allBoules.push(new Boule(this.canvas, ctx));
        }
    }

    

    Pincification() {
        if (Math.round(Math.random() * 1000000) == 5) {
            console.log(Math.round(Math.random() * 10));
            b = allBoules[Math.round(Math.random() * allBoules.length - 1)]
            b.pinceau = !b.pinceau;
        }
    }

    Update() {
        this.Pincification();
        this.allBoules.forEach(boule => {
            boule.Update();
        });
    }
}