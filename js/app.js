const board = document.querySelector('.board');

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