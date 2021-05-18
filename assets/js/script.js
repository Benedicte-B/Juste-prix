// JQUERY Partie 2 - TP 1

/*=================== CONSIGNES ==================*/
// Insérer une condition chiffre entre 1 et 100 avec message d'alerte OK
// Créer une REGEX
// Afficher le temps écoulé qui clignotte OK
// Nombre tentatives OK 
// Nombre de partie jouées, gagnées, perdues OK 
// Récupérer le meilleur temps ?? 

/*=================== DECLARER LES VARIABLES ==================*/
/*Part 1 : Button*/
let playGame = $('#playGame');
/* Changement de pages et bg*/
let firstPage = $('#firstPage');
let secondPage = $('#secondPage');
let thirdPage = $('#thirdPage');
let bg = $('.container-fluid');
/* Timer */
const minuteur = document.querySelector(".minuteur");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
let timerTime = 00;
let interval;
let isRanning = false;
/* Jeu */
// Définir un nombre aléatoire entre 1 et 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
/* Formulaire : button et champ */
let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');
/* Reset : remise à 0 */
let guessCount = 1;
let resetButton = document.querySelector('#resetButton');
/* Indices */
let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');
let counter = document.querySelector('.counter');
/* Compteur */
let winCounter = 0;
let looseCounter = 0;
let playCounter = 1;
let winChamp = document.querySelector('.winChamp');
let looseChamp = document.querySelector('.looseChamp');
let playChamp = document.querySelector('.playChamp');
/* Gagné perdu */
let loose = document.querySelector('.loose');
let win = document.querySelector('.win');
let nbcoups1 = document.querySelector('.nbcoups1');
let nbcoups2 = document.querySelector('.nbcoups2');
let reveal1 = document.querySelector('.reveal1');
let reveal2 = document.querySelector('.reveal2');
/* Gagné perdu */
let badges5 = document.querySelector('.badge5');
let badges10 = document.querySelector('.badge10');

/*=============== LANCER LE JEU ===================*/
playGame.click(function(){
    //Masque la 1ère partie
    firstPage.removeClass('d-block');
    firstPage.addClass('d-none');
    //Affiche la 2nde partie
    secondPage.removeClass('d-none');
    secondPage.addClass('d-block');
    //Change de Background
    bg.removeClass('bgPart1')
    bg.addClass('bgPart2');
})

/*================= FONCTIONNEMENT DU JEU =================*/
// Fonction jeu
function checkGuess() {
    // Récupére la valeur saisie dans le champs texte 
    // Vérifie qu'il s'agit bien d'un nombre, compris entre 1 et 100 : 
    let userGuess = Number(guessField.value);
        if( userGuess >= 1 && userGuess <= 100){
        } else {
            alert ('Dommage ! Lis les consignes ... Tu cherches un nombre entre 1 et 100 !')
        };
    if (guessCount === 1) {
        //Ajout texte Propositions précédentes et précédentes saisies 
        guesses.textContent = 'Propositions précédentes : ';
        startTimer();
    }
    guesses.textContent += userGuess + ' ';

    // Réussite
    if (userGuess === randomNumber) {
        /* BRAVO */
        bg.removeClass('bgPart2')
        bg.addClass('bgsuccess');
        win.textContent = 'BRAVO';
        reveal1.textContent = 'Le nombre était : ';
        reveal2.textContent = randomNumber;
        nbcoups1.textContent = 'Vous avez réussi en ';
        nbcoups2.textContent =  guessCount + ' coups';
        lowOrHi.textContent = '';
        winCounter++;
        setGameOver();
    } else if (guessCount === 10) {
        bg.removeClass('bgPart2');
        bg.addClass('bgloose');
        loose.textContent = 'PERDU';
        reveal1.textContent = 'Le nombre était : ';
        reveal2.textContent = randomNumber;
        nbcoups1.textContent = 'Vous avez utilisé vos ';
        nbcoups2.textContent =  guessCount + ' coups';
        looseCounter++;
        setGameOver();
        // Alerte + ou -
    } else {
        lastResult.textContent = 'Faux  !';
        lastResult.style.backgroundColor = '#9A2321';
        counter.textContent =  'Nombre de coups : ' + guessCount;
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Trop petit !';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Trop grand !';
        }
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();
}

/*=========== START STOP RESET GAME ===============*/
/* START : valider */
guessSubmit.addEventListener('click', checkGuess);
// Fonction perdu 
function setGameOver() {
    //Masque la 2ème partie
    secondPage.removeClass('d-block');
    secondPage.addClass('d-none');
    //  //Affiche la 3ème partie
    thirdPage.removeClass('d-none');
    thirdPage.addClass('d-block');
    // Grise les champs   
    // guessField.disabled = true;
    // guessSubmit.disabled = true;
    // resetButton = document.createElement('button');
    // resetButton.textContent = 'Start new game';
    // document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
    stopTimer();
    winChamp.textContent = winCounter;
    looseChamp.textContent =  looseCounter;
    playChamp.textContent =  playCounter;
}

/* RESET Remise à 0*/
function resetGame() {
    //Masque la 3ème partie
    thirdPage.removeClass('d-block');
    thirdPage.addClass('d-none');
    //Affiche la 2ème partie
    secondPage.removeClass('d-none');
    secondPage.addClass('d-block');
    guessCount = 1;

    let resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }
    // resetButton.parentNode.removeChild(resetButton);
    /* Remise à 0 des variables*/
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';
    bg.removeClass('bgloose');
    bg.removeClass('bgsuccess');
    bg.addClass('bgPart2');

    randomNumber = Math.floor(Math.random() * 100) + 1;
    resetTimer();
    playCounter++;
    winChamp.textContent = winCounter;
    looseChamp.textContent =  looseCounter;
    playChamp.textContent =  playCounter;
}



/*========= START STOP RESET TIMER ==========*/
/* Fonction Start */
function startTimer() {
    if (isRanning == false) {
        interval = setInterval(incrementTimer, 1000);
        isRanning = true;
    }
    $('.timer').removeClass("invisible");
    $('.timer').addClass("visible");
    $('.minuteur').addClass("clignote");
}
/* Fonction Stop */
function stopTimer() {
    if (isRanning == true) {
        clearInterval(interval); // clearInterval() methode js
        isRanning = false;
    }
    $('.minuteur').removeClass("clignote");
}
/* Fonction Reset */
function resetTimer() {
    stopTimer();
    timerTime = 00;
    minutes.innerText = '00';
    seconds.innerText = '00';
}
/*================= FONCTIONNEMENT DU TIMER =================*/
function incrementTimer() {
    timerTime++;
    const numberOfMinutes = Math.floor(timerTime / 60);
    const numberOfSeconds = Math.floor(timerTime % 60);
    minutes.innerText = zeroNumber(numberOfMinutes);
    seconds.innerText = zeroNumber(numberOfSeconds);
}
function zeroNumber(number) {
    return ( number < 10 ) ? '0' + number : number;

}

