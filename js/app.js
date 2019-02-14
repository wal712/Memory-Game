const board = document.querySelector('.board');
const cards = document.querySelectorAll('.card');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
const nums = shuffle([...Array(cards.length).keys()]);

// Applies shuffled order to DOM
function orderShuffle(cardList, nums) {
    for (let i = 0; i < cardList.length; i++) {
        cardList[i].setAttribute('style', 'order: ' + nums[i]);
    }
}

orderShuffle(cards, nums);

// Main listener function for tile clicks
function tileClick(evt) {
    const tile = evt.target;
    if (tile.classList.contains("card")){
        console.log("This is a card!");
        tile.classList.toggle("open");
        tile.firstElementChild.classList.toggle('hidden');
    } else {
        console.log("nope");
    } 
}

// Board event listener
board.addEventListener('click', tileClick);