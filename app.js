
// Declare global variables
const phrase = document.querySelector("#phrase");
const qwerty = document.querySelector("#qwerty");
const button_reset = document.querySelector(".btn__reset");
let wrongGuess = 0;
// phrase array
const phrases = [
    "the pink panther",
    "donald duck",
    "astro boy",
    "the cat in a hat",
    "the mouse in the house"
];

// when the start game button is clicked, hides the overlay
button_reset.addEventListener('click', () => {
const overlay = document.querySelector("#overlay");
overlay.style.display = "none";
});

// This function randomly gets a phrase from the phrases array
function getRandomPhraseAsArray(arr) {
const arrayLength = Math.floor(Math.random() * phrases.length); 
console.log(arrayLength)
randomPhrase = phrases[arrayLength];
phraseCharacters = randomPhrase.split("");
console.log(randomPhrase);
console.log(phraseCharacters);
return phraseCharacters;
};

const phraseArray = getRandomPhraseAsArray(phrases);

// This function adds the random phrase to a list item and appends the list item to the ul
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

addPhraseToDisplay(phraseArray);

// This function compares the button selected to the list items with a class ".letter"
function checkLetter(buttonSelected) {
const letters = document.querySelectorAll(".letter");
let letterMatch = null;
    for (let i = 0; i < letters.length; i++) {
        // console.log(letters[i]);
        // console.log(buttonSelected);
        console.log(letters[i].textContent);
        if (buttonSelected == letters[i].textContent) {
           console.log("letter Match");
           letters[i].className = "letter show";
           letterMatch = letters[i].textContent;
           console.log(letterMatch);
        //    return letterMatch;
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
if (event.target.tagName == 'BUTTON'){
 let letterFound = checkLetter(buttonContent); 
     for (let i = 0; i < buttons.length; i++) {
    event.target.className = "chosen";
    event.target.disabled = true; 
   
    }

// if the letter pressed on the screen is not found, remove a score and add 1 to the wrongGuess counter   
console.log(letterFound); 
let scoreboard = document.querySelector('#scoreboard ol');
const hearts = document.querySelectorAll('.tries');
    if (letterFound == null) {
        scoreboard.removeChild(hearts[0]);
        wrongGuess += 1;
    }
console.log(wrongGuess); 
const letters = document.querySelectorAll(".letter");
const show = document.querySelectorAll(".show");
console.log(letters.length);
console.log(show.length);

// This function checks if you have won the game or not and displays the appropriate overlay
function checkWin () {
let overlay = document.querySelector("#overlay");
let overlayLinks = document.querySelector("#overlay a");
let overlayTitle = document.querySelector(".title");
    if (show.length == letters.length) {
       overlay.className = "win";
       overlay.style.display = 'flex';
       overlayLinks.className = "win a";
       overlayTitle.textContent = "You Win !"
    } else if (wrongGuess >= 5) {
    overlay.className = "lose";
    overlay.style.display = "flex";
    overlayLinks.className = "lose a";
    overlayTitle.textContent = "Game Over "
    }
}

checkWin();
}
});


