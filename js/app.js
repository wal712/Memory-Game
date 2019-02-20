const board = document.querySelector('.board');
const cards = document.querySelectorAll('.card');
const moves = document.querySelector('.moves');
const winScreen = document.querySelector('.win-screen');
const stars = document.querySelectorAll('.on-screen-stars .fa-star');
const modalStars = document.querySelectorAll('.modal-stars .fa-star');
const redo = document.querySelector('.fa-redo');
const timerspan = document.querySelector('.timer');
const modalTime = document.querySelector('.time');
const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.play-again');

let selectedCards = [];
let matchedCards = [];
let numMatches = 0;
let numMoves = 0;
let counter = 1;

function Timer () {
    let timer;

    this.start = function () {
        timer = setInterval(function() {
            timerspan.textContent = `${Math.floor(counter/60)}:${counter%60}`;
            counter++;
        }, 1000);
    }

    this.stop = function () {
        clearInterval(timer);
    }

    this.reset = function() {
        counter = 1;
    }
}

let timer = new Timer();
timer.start();

// Function to check list equality
// https://stackoverflow.com/questions/4025893/how-to-check-identical-array-in-most-efficient-way
function equalArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

// Shuffle function from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Shuffles array of card list indices
let nums = shuffle([...Array(cards.length).keys()]);

// Applies shuffled order to DOM
function orderShuffle(cardList, nums) {
    for (let i = 0; i < cardList.length; i++) {
        cardList[i].setAttribute('style', 'order: ' + nums[i]);
    }
}

orderShuffle(cards, nums);

// Card flipping helper function
function flipCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('close');
    card.firstElementChild.classList.toggle('hidden');
}

// Sets star display
function checkStars() {
    if (numMoves > 18) {
        stars[2].classList.add('hidden');
        modalStars[2].classList.add('hidden');
        stars[1].classList.add('hidden');
        modalStars[1].classList.add('hidden');
    } else if (numMoves > 13) {
        stars[2].classList.add('hidden');
        modalStars[2].classList.add('hidden');
    }
}

function checkCards() {
    // If the first card has already been picked, and this is the second
    if (selectedCards.length === 2) {
        // Match
        if (equalArrays(selectedCards[0].firstElementChild.classList, selectedCards[1].firstElementChild.classList)) {
            for (let card of selectedCards) {
                card.classList.toggle('match');
                matchedCards.push(card);
            }
            numMatches++;
        }
        numMoves++;
        checkStars();
        moves.textContent = `${numMoves}`;
    }
}

// Sets wrong class for incorrect pairs
function checkWrong() {
    if (selectedCards.length === 2) {
        if (!equalArrays(selectedCards[0].firstElementChild.classList, selectedCards[1].firstElementChild.classList)) {
            for (let card of selectedCards) {
                card.classList.toggle('wrong');
            }
        }
    }
}

// Flips incorrect pairs and clears selectedCards
function flipWrong() {
    if (selectedCards.length === 2) {
        for (let card of selectedCards) {
            if (card.classList.contains('wrong')) {
                flipCard(card);
            }
        }
        selectedCards = selectedCards.slice(4);
    }
}

// Boolean Helper function for win condition
function ifWin() {
    if (matchedCards.length === cards.length) {
        return true;
    }
    return false;
}

// Function that displays Modal
function showModal() {
    modalTime.textContent = `You won in: ${Math.floor(counter/60)} minutes ${counter%60} seconds!`
    modal.classList.remove('hidden');
}

// Win condition checking
function checkWin() {

    if (ifWin()) {
        showModal();
        timer.stop();
    }
}

// Helper function
function toggleWrong(card) {
    card.classList.toggle('wrong');
}

// Main listener function for tile clicks
function tileClick(evt) {
    const tile = evt.target;
    if (tile.classList.contains("close") && !matchedCards.includes(tile)){
        if (selectedCards.length < 2) {
            tile.classList.remove('wrong');
            flipCard(tile);
            selectedCards.push(tile);

            setTimeout(checkCards, 0);

            checkWrong();

            setTimeout(flipWrong, 1500);
            setTimeout(checkWin, 0);

        }
    }
}

// Board event listener
board.addEventListener('click', tileClick);

// Listener function for Redo button
function reset(evt) {
    // Reset cards
    for (let card of cards) {
        card.classList.remove('open');
        card.classList.remove('wrong');
        card.classList.remove('match');
        card.classList.add('close');
        card.firstElementChild.classList.add('hidden');
    }
    selectedCards = selectedCards.slice(4);
    matchedCards = matchedCards.slice(20);

    nums = shuffle(nums);
    orderShuffle(cards, nums);

    // Scores and stars
    numMoves = 0;
    moves.textContent = `${numMoves}`;
    for (let star of stars) {
        star.classList.remove('hidden');
    }

    for (let star of modalStars) {
        star.classList.remove('hidden');
    }

    winScreen.textContent = '';

    // Timer Reset
    timer.stop();
    timer.reset();
    timer.start();

    modal.classList.add('hidden');
}

// Redo button event listener
redo.addEventListener('click', reset);

// Play again button event Listener
modalButton.addEventListener('click', reset);

// Listener function for modal event listener
function onClick(evt) {
    if (evt.target === modal) {
        console.log('modal hide');
        modal.classList.add('hidden');
    }
}

// Modal event Listener
modal.addEventListener('click', onClick);
