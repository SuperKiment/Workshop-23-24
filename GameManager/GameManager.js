export default class GameManager {
    static Coins = 100;
    static runningGame;
    static allBoutons = {};
    static boutons = {
        "Menu": this.onMenuClick,
        "Options": this.onOptionsClick,
        "APropos": this.onAProposClick,
        "Jouer": this.onJouerClick,
    };
    static miniJeux = {};
    static ctx;

    static onMenuClick() {
        console.log("Menu");
    }

    static onJouerClick() {
        ToGameManager("Jouer")
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

    static Jouer() {

        let allBoutons = this.LoadBoutons();

        for (let boutonString in this.boutons) {
            if (boutonString == "Jouer" || boutonString == "Options" || boutonString == "APropos") {
                console.log(boutonString)
                allBoutons["Btn" + boutonString].style.display = "none";
            }
        }

        document.getElementById("Title").style.display = "none";

        this.runningGame = null;
        this.runningGame = new this.miniJeux["Memoire"](this.ctx.canvas, this.ctx);


    }
}

function ToGameManager(btn) {
    switch (btn) {
        case "Jouer":
            GameManager.Jouer();
            break;
        default: console.log("Pas trouvé le bouton")
    }
}