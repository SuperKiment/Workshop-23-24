export default class GameManager {
    static runningGame;
    static allBoutons = {};
    static boutons = {
        "Menu": this.onMenuClick,
        "Options": this.onOptionsClick,
        "APropos": this.onAProposClick,
        "Jouer": this.onJouerClick,
        "Passer": this.onPasserClick,
        "Recommencer": this.onRecommencerClick,
    };
    static miniJeux = {};
    static ctx;
    static etape = 0;

    static onPasserClick() {
        ToGameManager("Passer");
    }

    static onRecommencerClick() {
        ToGameManager("Recommencer");
    }

    static onMenuClick() {
        ToGameManager("Menu");
    }

    static onJouerClick() {
        ToGameManager("Jouer");
    }

    static onOptionsClick() {
        console.log("Options");
    }

    static onAProposClick() {
        console.log("A Propos");
    }

    static Setup(miniJeux, ctx) {
        //Récupération du dico des mini-jeux
        this.miniJeux = miniJeux;
        //Liaison fonction-HTML
        this.allBoutons = this.LoadBoutons();
        //Récupération du contexte du canvas du mini-jeu
        this.ctx = ctx;

        //Par défaut, le template est activé en fond derrière le menu principal
        this.runningGame = new this.miniJeux["Template"](ctx.canvas, ctx);
    }

    static LoadBoutons() {
        let res = {};

        //En passant par tous les boutons du dictionnaire
        for (let boutonString in this.boutons) {
            //On récupère le bouton HTML
            let bouton = document.getElementById("Btn" + boutonString);
            //On lui ajoute la fonction associée
            bouton.addEventListener('click', this.boutons[boutonString]);
            //Puis on le met dans un second dictionnaire de données pour une utilisation future.
            res["Btn" + boutonString] = bouton;
        }

        return res;
    }

    static UpdateState(step) {
        switch (step) {
            case "Menu":
                this.etape = 0;
                this.Menu();
                break;

            case "Jouer":
                this.etape = 1;
                document.getElementById("Title").style.display = "none";
                document.getElementById("BoutonsMilieu").style.display = "none";
                break;

            case "Suivant":
                this.etape++;
                console.log("Suivant")
                break;

            case "Recommencer":
                //Pas besoin de faire quoi que ce soit car il ré-intancie un jeu
                break;
        }

        document.getElementById("ControlesLaby").style.display = "none";
        document.getElementById("SnakeControls").style.display = "none";
        document.getElementById("Resultats").style.display = "none";
        if (this.etape != 0) {
            document.getElementById("BtnPasser").style.display = "block";
            document.getElementById("BtnRecommencer").style.display = "block";

            this.runningGame = null;
            switch (this.etape) {
                case 1:
                    this.runningGame = new this.miniJeux["Memoire"](this.ctx.canvas, this.ctx);
                    break;
                case 2:
                    document.getElementById("ControlesLaby").style.display = "block";
                    this.runningGame = new this.miniJeux["Labyrinthe"](this.ctx.canvas, this.ctx);
                    break;
                case 3:
                    document.getElementById("SnakeControls").style.display = "block";
                    this.runningGame = new this.miniJeux["Snake"](this.ctx.canvas, this.ctx);
                    break;
                case 4:
                    document.getElementById("Resultats").style.display = "block";
                    this.runningGame = new this.miniJeux["Resultats"](this.ctx.canvas, this.ctx);
                    break;
                case 5:
                    location.reload();
                    break;

            }
        } else {
            document.getElementById("BtnPasser").style.display = "none";
            document.getElementById("BtnRecommencer").style.display = "none";
        }
    }

    static Menu() {

        document.getElementById("BoutonsMilieu").style.display = "block";
        document.getElementById("Title").style.display = "block";


        this.runningGame = null;
        this.runningGame = new this.miniJeux["Template"](this.ctx.canvas, this.ctx);
    }
}

function ToGameManager(btn) {
    switch (btn) {
        case "Jouer":
            GameManager.UpdateState("Jouer");
            break;
        case "Menu":
            GameManager.UpdateState("Menu");
            break;
        case "Recommencer":
            GameManager.UpdateState("Recommencer");
            break;
        case "Passer":
            GameManager.UpdateState("Suivant");
            break;
        default: console.log("Pas trouvé le bouton")
    }
}