class HangmanGame{
    constructor(word, userWord, userGuess, lives, statut){
        this.word = word.word.toUpperCase().split('')
        this.userWord = Array.apply(null, { length: this.word.length })
        this.userGuess = []
        this.lives = 8
        this.statut = ''
    }

    guess(letter){
        var letterInWord = ''

        for(let i = 0; i < this.word.length; i++){
            if(letter === this.word[i]){
                this.userWord[i] = letter
            }

            letterInWord = true
        }

        if(this.word.includes(letter) == false){
            this.lives-- 

            letterInWord = false
        }

        this.userGuess.push(letter)
        return letterInWord
    }

    statutUpdate(){
        if(this.userWord.indexOf(undefined) === -1){
            this.statut = true
        } else if(this.lives === 0){
            this.statut = false
        }
    }
}

const words = [
    { word: "Chaussure", info: "Se porte aux pieds", hint: ["S'utilise au quotidien"] },
    { word: "Ordinateur", info: "Permet de traiter des données", hint: ["Appareil électronique", "Utilisé pour travailler", "Possède un écran et un clavier"] },
    { word: "Livre", info: "Contient des histoires", hint: ["Peut être imprimé", "Utilisé pour la lecture", "Composé de pages reliées"] },
    { word: "Avion", info: "Permet de voyager dans les airs", hint: ["Moyen de transport", "Possède des ailes", "Utilise des moteurs"] },
    { word: "Télévision", info: "Affiche des images et du son", hint: ["Utilisée pour regarder des programmes", "Possède un écran", "Peut être connectée à Internet"] },
    { word: "Voiture", info: "Moyen de transport terrestre", hint: ["Utilisée pour se déplacer", "Possède quatre roues", "Fonctionne à l'essence"] },
    { word: "Banane", info: "Fruit jaune courbé", hint: ["Possède une peau", "Riche en potassium", "Souvent utilisée dans les smoothies"] },
    { word: "Montagne", info: "Grande élévation naturelle du terrain", hint: ["Peut être enneigée", "Propice à la randonnée", "Offre de magnifiques paysages"] },
    { word: "Guitare", info: "Instrument de musique à cordes", hint: ["Se joue en grattant les cordes", "Utilisée dans de nombreux styles de musique", "Possède un manche et une caisse de résonance"] },
    { word: "Café", info: "Boisson stimulante", hint: ["Souvent consommée le matin", "Provient des grains de café", "Peut être préparée sous différentes formes"] },
    { word: "Souris", info: "Périphérique d'entrée pour l'ordinateur", hint: ["Utilisée pour pointer et cliquer", "Peut être sans fil", "Possède des boutons"] },
    { word: "Football", info: "Sport collectif joué avec un ballon", hint: ["Populaire dans de nombreux pays", "Se joue sur un terrain", "Le but est de marquer des buts"] },
    { word: "Arbre", info: "Plante vivace dotée d'une tige ligneuse", hint: ["Possède des feuilles", "Peut produire des fruits", "Offre de l'ombre et de l'oxygène"] },
    { word: "Piano", info: "Instrument de musique à clavier", hint: ["Se joue en appuyant sur les touches", "Utilisé dans la musique classique", "Possède plusieurs octaves"] },
    { word: "Pizza", info: "Plat italien composé d'une pâte garnie", hint: ["Cuite au four", "Peut avoir diverses garnitures", "Populaire dans le monde entier"] },
    // ... Ajoutez plus de mots ici
  ];

function selectWord(wordList){
    word = wordList[Math.floor(Math.random() * (wordList.length - 0 + 1))]

    document.getElementById('info').innerText = word.info

    return word
}

function drawWord(game, statut='start'){
    for(var i = 0; i < game.word.length; i++){
        if(statut !== 'inGame'){
            elt = document.createElement('span')
            letter = document.createTextNode('_')
            elt.appendChild(letter)
            document.getElementById('word').appendChild(elt)
        } else{
            for(var i = 0; i < game.userWord.length; i++){
                span = document.getElementById('word').children[i] 

                if(game.userWord[i] === undefined){
                    span.innerText =  '_'
                } else{
                    span.innerText = game.userWord[i]
                }
            }
        }
    }
}

function drawKeyboard(){
    for(var i = 65; i <= 90; i++){
        elt = document.createElement('span')
        letter = document.createTextNode(String.fromCharCode(i))
        elt.classList.add('letter')
        elt.appendChild(letter)
        elt.setAttribute('letter', String.fromCharCode(i))
        elt.onclick = playLetter
        document.getElementById('keyboard').appendChild(elt)
    }
}

function playLetter(){
    letterStatut = game.guess(this.getAttribute('letter'))

    if(letterStatut === true){
        this.setAttribute('inWord', 'true')
        this.onclick = ''
    } else{
        this.setAttribute('inWord', 'false')
        this.onclick= ''
    }

    drawWord(game, 'inGame')

    game.statutUpdate()

    if(game.statut === true){
        var letterCollection = document.getElementsByClassName('letter')
        alert("Vous avez gagné")
        letterCollection.forEach(elt => {
            alert(elt.getAttribute("letter"))
            elt.onclik = ''
        });
    } else if(game.statut === false){
        document.getElementsByClassName('letter').onclick = ''
        alert("Vous avez perdu")
    }
}

function hint(){
    list = document.getElementById('hintList')
    if(list.children.length < word.hint.length){
        elt = document.createElement('li')
        elt.innerText = word.hint[list.children.length]
        list.appendChild(elt)
    }
}

word = selectWord(words)
game = new HangmanGame(word)

drawWord(game)
drawKeyboard()
