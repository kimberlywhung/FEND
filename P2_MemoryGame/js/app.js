/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
let openCards = [];
let moves= 0;
let timerOff = true;
let time = 0;
let timerId;
let matched = 0;
const TOTAL_PAIRS = 8;
window.onload = deckShuffle();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

//This shuffles the card deck
function deckShuffle() {
 const cardsForShuffle = Array.from(document.querySelectorAll('.deck li'));
 const shuffledCards = shuffle(cardsForShuffle);
 for (cardClick of shuffledCards) {
   deck.appendChild(cardClick);
 }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



//When card is clicked
deck.addEventListener('click', event => {
    const cardClick = event.target;
    if (clickValid(cardClick)
      ){
      if (timerOff){
        startTimer();
        timerOff = false;
      }
      toggleCard(cardClick);
      addToggleCard(cardClick);
      if(openCards.length === 2){
        checkMatch(cardClick);
        addMove();
        checkScore();
      }
    }
});

//Flips the card
function toggleCard(cardClick) {
  cardClick.classList.toggle('open');
  cardClick.classList.toggle('show');
}

//Adds card to openCards array
function addToggleCard(cardClick) {
  openCards.push(cardClick);
  console.log(openCards);
}

//Checks whether open cards match
function checkMatch() {
  if (
    openCards[0].firstElementChild.className
    ===
    openCards[1].firstElementChild.className
  ){
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    openCards = [];
    matched++;
  } else {
      setTimeout(() => {
        toggleCard(openCards[0]);
        toggleCard(openCards[1]);
        openCards = [];
      }, 1000);
  }
  if (matched === TOTAL_PAIRS) {
      gameOver();
  }
}

//Checks whether click was valid
function clickValid(cardClick) {
  return (
    cardClick.classList.contains('card')
    && !cardClick.classList.contains('match')
    && openCards.length <2
    && !openCards.includes(cardClick)
  );
}

//Tracks number of clicks or moves
function addMove() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

//Determines star score by removing a star at 10 and 16 moves
function checkScore(){
  if (moves === 10 || moves === 16
    ) { disentigrateStar();
  }
}

//Hides star based on score
function disentigrateStar() {
  const triStar = document.querySelectorAll('.stars li');
  for (star of triStar){
      if (star.style.display !== 'none') {
          star.style.display = 'none';
          break;
      }
  }
}

//Timer functionality
function startTimer() {
    timerId = setInterval(() => {
    time++;
    displayTimer();
  }, 1000);
}

//What is shown on timer
function displayTimer() {
    const timer = document.querySelector('.clock');
    timer.innerHTML = time;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (seconds < 10) {
        timer.innerHTML = `${minutes}:0${seconds}`;
    } else {
        timer.innerHTML = `${minutes}:${seconds}`;
    }
}

//Stops the timer when appropriate
function stopTimer() {
    clearInterval(timerId);
}

//Opens and closes modal
function openModal() {
    const modal = document.querySelector('.modal_background');
	if(modal.classList.contains('hide')) {
		modal.classList.remove('hide');
	} else {
		modal.classList.add('hide');
	}
}

//Displays game stats
function displayModalStats() {
    let timeStat = document.querySelector('.modal_time');
    let clockTime = document.querySelector('.clock').innerHTML;
    let movesStat = document.querySelector('.modal_moves');
    let starsStat = document.querySelector('.modal_stars');
    const stars = findStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

//Calculates number of stars won
function findStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    return starCount;
}

function timeReset() {
      stopTimer();
      timerOff = true;
      time = 0;
      displayTimer();
  }

function movesReset () {
      moves = 0;
      document.querySelector('.moves').innerHTML = moves;
  }

function starsReset() {
      stars = 0;
      let listStars = document.querySelectorAll('.stars li');
      for (star of listStars) {
          star.style.display = 'inline';
      }
  }

function cardReset() {
    const cards = document.querySelectorAll(".deck li");
    for (let card of cards) {
      card.className = "card";
    }
  }

function gameReset() {
    matched = 0;
    timeReset();
    movesReset();
    starsReset();
    deckShuffle();
    cardReset();
}

function gameOver() {
    stopTimer();
    displayModalStats();
    openModal();
}

 function gameReplay() {
     gameReset();
     openModal();
 }

 //controls the cancel button on the modal
 document.querySelector('.modal_cancel').addEventListener('click', openModal);

 //controls the replay button on the modal
 document.querySelector('.modal_replay').addEventListener('click', gameReplay);

 //controls the reset button
 document.querySelector('.restart').addEventListener('click', gameReset);
