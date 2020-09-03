
// Declare global variables
const phrase = document.querySelector("#phrase");
const qwerty = document.querySelector("#qwerty");
const button_reset = document.querySelector(".btn__reset");
const keyboardButton = document.querySelectorAll('.keyrow button');
let wrongGuess = 0;




// phrase array
const phrases = [
    "the pink panther",
    "donald duck",
    "astro boy",
    "the cat in a hat",
    "the mouse in the house",
	"bonnie and clyde",
	"reservoir dogs",
	"airplane",
	"up",
	"rocky",
	"memento",
	"braveheart",
	"slumdog millionaire",
	"the lord of the rings",
	"beauty and the beast",
	"seven",
	"inception",
	"die hard",
	"ghostbusters",
	"blazing saddles",
	"gladiator",
	"avatar",
	"the lion king",
	"raging bull",
	"mary poppins",
	"groundhog day"
];


// This function randomly generates a phrase from the phrases array
function getRandomPhraseAsArray(arr) {
const arrayLength = Math.floor(Math.random() * phrases.length); 
randomPhrase = phrases[arrayLength];
phraseCharacters = randomPhrase.split("");
return phraseCharacters;
};


// This function adds the random phrase to a list item and appends the list item to the ul
// Also adds the classname "letter" or "space" to the relevant list item;
// @param is the array or phrases
function addPhraseToDisplay (arr) {
const ul = document.querySelector('#phrase ul');
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = arr[i];
        if (arr[i] != " ") {
        li.className = "letter";
        } else {
        li.className = "space";
        }
    }
}

// This event hides the overlay, and resets the counters, list items, buttons, hearts back to their 
// original state.
button_reset.addEventListener('click', () => {
    // Adds the pointer cursor to all keyboard buttons
for (let i = 0; i < keyboardButton.length; i++) {
    keyboardButton[i].style.cursor = "pointer";
    }
    // Hides the overlay
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
    // reset the wrongGuess counter
    wrongGuess = 0;
    //removes the class from the buttons and enables the buttons
    const buttons = document.querySelectorAll('.keyrow button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("chosen");
        buttons[i].disabled = false;
    }
    // resets the src for all hearts images to be "liveHeart.png"
    const hearts = document.querySelectorAll('.tries img');
    for (let j = 0; j < hearts.length; j++) {
        hearts[j].src = "images/liveHeart.png";
    }
    // removes all the list items;
    const listItems = document.querySelectorAll('ul li');
    for (let j = 0; j < listItems.length; j++) {
        if (listItems[j] != 0) {
        listItems[j].remove();
        }
    }
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});


// This function compares the button selected to the list items with a class ".letter"
// @param is the button pressed on the on-screen keyboard
// @return is the letter returned, it matched it will be the letter content, if not it will be null
function checkLetter(buttonSelected) {
const letters = document.querySelectorAll(".letter");
let letterMatch = null;
    for (let i = 0; i < letters.length; i++) {
        if (buttonSelected == letters[i].textContent) {
           letters[i].className = "letter show";
           letterMatch = letters[i].textContent;
       }  
    }
return letterMatch;
}


// This event listener compares the button clicked on the on-screen keyboard and the phrase that has been generated
// as a list item.

qwerty.addEventListener('click', (event) => {
 const button = document.querySelector('.keyrow button').target;
 const buttons = document.querySelectorAll('.keyrow button');
 const buttonContent = event.target.textContent;
 const keyRows = document.querySelector('.keyrow');
// Checks to make sure ony "buttons" in the qwerty element can be clicked
    if (event.target.tagName == 'BUTTON'){
// once the button has been clicked, change cursor to none
        event.target.style.cursor = 'none';
    // If the letter is found
    let letterFound = checkLetter(buttonContent); 
        for (let i = 0; i < buttons.length; i++) {
        // add the class 'chosen', disabled the button]
        event.target.className = "chosen";
        event.target.disabled = true;   
    }

// if the letter pressed on the screen is not found, remove a score and add 1 to the wrongGuess counter   

let scoreboard = document.querySelector('#scoreboard ol');
const hearts = document.querySelectorAll('.tries img');
    if (letterFound == null) {
        hearts[wrongGuess].src = "images/lostHeart.png";
        hearts.length --;
        wrongGuess += 1;
    }

const letters = document.querySelectorAll(".letter");
const show = document.querySelectorAll(".show");

// This function checks if you have won the game or not and displays the appropriate overlay
function checkWin () {
let overlay = document.querySelector("#overlay");
let overlayLinks = document.querySelector("#overlay a");
let overlayTitle = document.querySelector(".title");
    if (show.length == letters.length) {
       overlay.className = "win";
       overlay.style.display = 'flex';
       overlayTitle.textContent = "You Win !"
       button_reset.textContent = "New Game";
    } else if (wrongGuess >= 5) {
    overlay.className = "lose";
    overlay.style.display = "flex";
    overlayTitle.textContent = "Game Over "
    button_reset.textContent = "Try Again";
    }
}
checkWin();
}
});





