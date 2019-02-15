const board = document.querySelector('.board');
const cards = document.querySelectorAll('.card');
let selectedCards = [];
let matchedCards = [];

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
const nums = shuffle([...Array(cards.length).keys()]);

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

function checkCards() {
    // If the first card has already been picked, and this is the second
    if (selectedCards.length === 2) {
        if (equalArrays(selectedCards[0].firstElementChild.classList, selectedCards[1].firstElementChild.classList)) {
            console.log('match');
            for (let card of selectedCards) {
                card.classList.toggle('match');
                matchedCards.push(card);
            }
        } 
    }
}

function checkWrong() {
    if (selectedCards.length === 2) {
        if (!equalArrays(selectedCards[0].firstElementChild.classList, selectedCards[1].firstElementChild.classList)) {
            console.log('no match');
            for (let card of selectedCards) {
                card.classList.toggle('wrong');
            }
        }
    }
}

function flipWrong() {
    if (selectedCards.length === 2) {
        console.log('check2');
        for (let card of selectedCards) {
            if (card.classList.contains('wrong')) {
                console.log('check');
                flipCard(card);
            }
        }
        selectedCards = selectedCards.slice(4);
    }
}
function toggleWrong(card) {
    card.classList.toggle('wrong');
}

// TODO: use replace instead of toggle, replace open with closed classes

// Main listener function for tile clicks
function tileClick(evt) {
    const tile = evt.target;
    if (tile.classList.contains("card") && !matchedCards.includes(tile) && !tile.classList.contains("open")){
        console.log("This is a card!");
        flipCard(tile);
        tile.classList.remove('wrong');
        selectedCards.push(tile);

        setTimeout(checkCards, 1000);
        
        checkWrong();
        
        setTimeout(flipWrong, 2000);
    } else {
        console.log("nope");
    } 
}

// Board event listener
board.addEventListener('click', tileClick);