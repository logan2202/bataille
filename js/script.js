/*Boostrap*/
/*JS*/
let btnV = document.getElementById("btnV")
let pseudo = document.getElementById("pseudo")
let pseudonyme = document.getElementById("pseud")
let pioche = document.getElementById("pioche")
btnV.addEventListener('click', () => {
    pseudonyme.innerHTML = pseudo.value;
    btnV.style.display = "none";
    pseudo.style.display = "none";
    pioche.style.visibility = "visible";
})

class Card {
    constructor(nom, puissance, score, couleur, cardName) {
        this.nom = nom;
        this.puissance = puissance;
        this.score = score;
        this.couleur = couleur; // Couleur =  Trefle / Pique / Coeur / Carreau
        this.cardName = cardName;
    }
}

nom = new Array("Sept", "Huit", "Neuf", "Dix", "Valet", "Dame", "Roi", "As")
couleur = new Array("Trefle", "Pique", "Coeur", "Carreau")
puissance = new Array(7, 8, 9, 10, 11, 12, 13, 14)
score = new Array(1, 2, 3, 4, 5, 6, 7, 8)

cardDeck = new Array()

function newPackage() {
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 8; i++) {
            let cardName = nom[i] + couleur[j];
            carte = new Card(nom[i], puissance[i], score[i], couleur[j], cardName)
            cardDeck.push(carte)
        }

    }
}
let test = document.getElementById("test1")
window.onload = newPackage()


function shuffleCard() {
    test.innerHTML = " "
    for (let i = 0; i < 500; i++) {
        let c1 = Math.floor(Math.random() * 32)
        let c2 = Math.floor(Math.random() * 32)
        temp = cardDeck[c1]
        cardDeck[c1] = cardDeck[c2]
        cardDeck[c2] = temp
    }
}

deckP = new Array()
deckC = new Array()

function distribution() {
    //On récupère la moitié des cartes du deck (cardDeck.length / 2) et on les ajoute une par une dans le tableau deckP (.push)
    for (let i = 0; i < cardDeck.length / 2; i++) {
        deckP.push(cardDeck[i])
    }
    for (let i = cardDeck.length / 2; i < cardDeck.length; i++) {
        deckC.push(cardDeck[i])
    }
}

let test2 = document.getElementById("test2")
let piocheClick = document.getElementById("piocheClick")
piocheClick.addEventListener("click", playCard)

let defausseC = new Array();
let defausseP = new Array();
let defausseB = new Array();
let bataille = false;
let scoreC = 0;
let scoreP = 0;
let BscoreP = 0;
let BscoreC = 0;

function playCard() {
    let cardPnb = deckP.length + defausseP.length;
    let cardCnb = deckC.length + defausseC.length;
    document.getElementById("cardsP").innerHTML = cardPnb;
    document.getElementById("cardsC").innerHTML = cardCnb;
    if (cardPnb == 0) {
        document.getElementById("modP").style.display = "block";
        document.getElementById("cardsC").innerHTML = 32;
    }
    if (cardCnb == 0) {
        document.getElementById("modV").style.display = "block";
        document.getElementById("cardsP").innerHTML = 32;
    }
    if (deckC.length == 0) {
        for (let i of defausseC) {
            deckC.push(i);
        }
        defausseC.length = 0;

    }
    if (deckP.length == 0) {
        for (let i of defausseP) {
            deckP.push(i);
        }
        defausseP.length = 0;

    }
    if (bataille == false) {
        //affichage des images au click
        let compCard = deckC.shift();
        test.innerHTML = '<img src="img/' + compCard.cardName + '.png"  alt="" ></img>';
        let playerCard = deckP.shift();
        test2.innerHTML = '<img src="img/' + playerCard.cardName + '.png"  alt="" ></img>';
        //Calcule des puissance + score
        if (compCard.puissance > playerCard.puissance) {
            defausseC.push(playerCard, compCard);
            //Afficher la défausseB pour l'ordinateur
            document.getElementById("batailleC").innerHTML = " ";
            for (let i = 0; i < defausseB.length; i++) {
                document.getElementById("batailleC").insertAdjacentHTML(position = "afterbegin", text = '<img src="img/' + defausseB[i].cardName + '.png"  alt="" id="test"></img>');
            } //Pour que la main gagnante puisse récupérer la défausse
            for (let i of defausseB) {
                defausseC.push(i);
            }
            //Pour vider la défausse si elle est pleine
            if (defausseB.length > 0) {
                defausseB.length = 0;
            }
            scoreC += playerCard.score;
            scoreC += BscoreC
            BscoreC = 0;
            document.getElementById("scoreC").innerHTML = scoreC;

        } else if (compCard.puissance < playerCard.puissance) {
            defausseP.push(playerCard, compCard);
            //Afficher la défausseB pour le joueur
            document.getElementById("batailleP").innerHTML = " ";
            for (let i = 0; i < defausseB.length; i++) {
                document.getElementById("batailleP").insertAdjacentHTML(position = "afterbegin", text = '<img src="img/' + defausseB[i].cardName + '.png"  alt="" id="test"></img>');
            } // Push de la défausse
            for (let i of defausseB) {
                defausseP.push(i);
            }
            //Pour vider la défausse si elle est pleine
            if (defausseB.length > 0) {
                defausseB.length = 0;
            }
            scoreP += compCard.score
            scoreP += BscoreP;
            BscoreP = 0;
            document.getElementById("scoreP").innerHTML = scoreP;
        }
        if (compCard.puissance == playerCard.puissance) {
            defausseB.push(playerCard, compCard);
            bataille = true;
    }
 } else {
        //On défausse les cartes dans une défausse spéciale bataille que le joueur gagnant emporte.
        let compCardB = deckC.shift();
        let playerCardB = deckP.shift();
        defausseB.push(playerCardB, compCardB);
        test.innerHTML = '<img src="img/miguel.jfif" class="img-thumbnail rounded" alt="carte retournée"></img>'
        test2.innerHTML = '<img src="img/Manoarr.png" class="img-thumbnail rounded" alt=""></img>'
        bataille = false;
        BscoreC += playerCardB.score;
        BscoreP += compCardB.score;
    }
}

function restart() {
    location.reload()
}
shuffleCard()
distribution()

