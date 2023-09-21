export default class GameManager {
    static Coins = 100;
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
        this.miniJeux = miniJeux;
        this.allBoutons = this.LoadBoutons();
        this.ctx = ctx;

        this.runningGame = new this.miniJeux["Template"](ctx.canvas, ctx);
    }

    static LoadBoutons() {
        let res = {};

        for (let boutonString in this.boutons) {
            let bouton = document.getElementById("Btn" + boutonString);
            bouton.addEventListener('click', this.boutons[boutonString]);
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
                console.log("bfzek")
                break;

            case "Recommencer":
                //this.runningGame = new this.miniJeux["Memoire"](this.ctx.canvas, this.ctx);
                break;
        }

        document.getElementById("ControlesLaby").style.display = "none";
        document.getElementById("SnakeControls").style.display = "none";
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