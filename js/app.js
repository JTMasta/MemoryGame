let cardValues = [
    'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-anchor',
    'fa fa-bolt',
    'fa fa-cube',
    'fa fa-leaf',
    'fa fa-bicycle',
    'fa fa-bomb'
];
//used concat method to duplicate values for a total of 16 cardvalues
cardValues = cardValues.concat(cardValues);

let cardsOpened = [];// an array to place a max of two cards for evaluation
let cardsMatched = 0; // user wins once cardsMatched reaches 8 
let moves = document.querySelector("span");
let nbOfMoves = 0;
let gameTime; //this variable will be assigned to the setInterval function so that it can be called with the clearInterval function
let time = 0;
let min = 0;
let sec = 0;
let starsRemaining = 3;
moves.textContent = nbOfMoves;

const modal = document.querySelector("#simpleModal");
const closeBtn = document.querySelector(".closeBtn");
const modalMessage = document.querySelector("p");
const restart = document.querySelector(".restart").addEventListener("click", playAgain, true);
const deck = document.querySelectorAll(".card i");
const cardList = document.querySelectorAll(".card");
const timer = document.querySelector(".timer")

cardValues = shuffle(cardValues);
// shuffle method provided from udacity starter kit
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Set image values to each card in the deck
for(let i = 0; i < deck.length; i++) {
    deck[i].setAttribute("class", cardValues[i]);
}
//Add event listener to every card to allow user to click
for(let i = 0; i < cardList.length; i++) {
    cardList[i].addEventListener("click", playGame, true);
}

// reset function. reset all values and attributes once the icon is clicked
function playAgain() {
    restartTime();
    addStars();
    starsRemaining = 3;
    cardsOpened = [];
    cardsMatched = 0;
    nbOfMoves = 0;
    moves.textContent = nbOfMoves;
    cardValues = shuffle(cardValues);

    for(let i = 0; i < cardList.length;i++) {
        deck[i].setAttribute("class", cardValues[i]);
        cardList[i].setAttribute("class", "");
        cardList[i].classList.add("card");
    }
}
//Adds css class is each card that is clicked by the user to reveal
function revealCard(clickedCard) {
    clickedCard.classList.add("open", "show");
}

function playGame(event) {
    if(cardsOpened.length === 0 && time === 0) {
        startTime();
        time++;
    }
    let clickedCard = event.target;
    /**
     * The below line (90) prevent multiple clicks of the same card. Advised by
     * one of the users from udacity https://github.com/Shelby18k/Memory-Game
     */
    if(!clickedCard.classList.contains("open") && clickedCard.className === "card"){
        if(cardsOpened.length !== 2) {
            cardsOpened.push(clickedCard); // places 2 cards inside cardsOpened Array
            revealCard(clickedCard); 
        }
        if(cardsOpened.length === 2) {
            if (match()) { // if there's a match nb of moves inc and cardsMatch inc
                incrementMoves();
                cardsMatch();
                cardsMatched += 1;
            } else  {
                incrementMoves(); // incrementing moves whether it matches or not
                noMatch();
            }
        }
        if(nbOfMoves === 10 && cardsOpened.length === 2) {
            removeStar();
        }
        if(nbOfMoves === 18 && cardsOpened.length === 2) {
            removeStar();

        }
    }
    
    if(cardsMatched === 8) {
        moves.textContent = nbOfMoves;
        youWon();
    }
}
// returns a boolean by checking if both cards match
function match() {
    return cardsOpened[0].innerHTML.trim() === cardsOpened[1].innerHTML.trim();
}
/**
 * Class attributes get removed from both cards with some animation 
 * before getting flipped facedown.
 */
function noMatch() {
    setTimeout(function () {
        moves.textContent = nbOfMoves;
        cardsOpened[0].classList.add("noMatch");
        cardsOpened[1].classList.add("noMatch");
    }, 200)

    setTimeout(function() {
        cardsOpened[0].classList.remove("open", "show", "noMatch");
        cardsOpened[1].classList.remove("open", "show", "noMatch");
        cardsOpened = [];
    }, 900)
}
// animation match gets attached to both cards
function cardsMatch() {
    setTimeout(function() {
        cardsOpened[0].classList.add("match");
        cardsOpened[1].classList.add("match");
        console.log("Cards Matched... "+cardsMatched);
        moves.textContent = nbOfMoves;
        cardsOpened = [];
    }, 350)
}

function incrementMoves() {
    return nbOfMoves++;
}
// removes a star icon everytime this function is called
function removeStar() {
    starsRemaining--;
    const stars = document.querySelector('.fa-star');
    stars.remove();
}
// adds all stars once the game is played again by changing the innerHTML
function addStars() {
    const ul = document.querySelector('.stars').innerHTML = `
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
}
/**
 * Modal becomes visible displaying the results.
 * If user clicks on play Again, modal dissapears and game restarts.
 * event listener added to play again button
 */
function youWon() {
    modal.style.cssText = "visibility: visible";
    closeBtn.addEventListener("click", function() {
        modal.style.cssText = "visibility: hidden";
    })
    displayModalMsg();
    restartTime();
    const playAgainBtn = document.querySelector(".tryAgain").addEventListener("click", function() {
        playAgain();
        modal.style.cssText = "visibility: hidden";
    }, true);
}
// Simple timer created to keep track of time to display to user once game is completed
function startTime() {
    gameTime = setInterval(function() {
        timer.textContent = min + " Minute(s) " + sec + " Second(s) ";
        sec++;
        if(sec === 60) {
            min++;
            sec = 0;
        }
    }, 1000)
}
//clearing time using clearInterval function
function restartTime() {
    clearInterval(gameTime);
    time = 0;
    min = 0;
    sec = 0;
    timer.textContent = "Timer";
}
//Message to be displayed once the user wins
// play again button is created within this innerHTML
function displayModalMsg() {
    modalMessage.innerHTML = `
    <h2>Congratulations! You won!</h2> 
    <p>With ${moves.textContent} moves.</p> <p>Number of Stars: ${starsRemaining}</p>
    <p>Time taken to complete the game: ${min} Minute(s) and ${sec} Second(s).</p><button class="tryAgain">Play Again!</button>`
}