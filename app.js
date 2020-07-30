
// Declare global variables
const phrase = document.querySelector("#phrase");
const qwerty = document.querySelector("#qwerty");
const button_reset = document.querySelector(".btn__reset");
const missedGuesses = 0;
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
        if (buttonSelected === letters[i].textContent) {
           letters[i].className = "letter show";
           letterMatch = buttonSelected.textContent;
           
        } 
         
    }
  return letterMatch
}



qwerty.addEventListener('click', (event) => {
 console.log("I pressed outside a button")
 const button = document.querySelector('.keyrow button');
 const buttons = document.querySelectorAll('.keyrow button');
 const buttonContent = event.target.textContent;
 console.log(buttonContent);
    
          for (let i = 0; i < buttons.length; i++) {
            let letterFound = [checkLetter(buttonContent)];
            
            event.target.className = "chosen";
            event.target.disabled = true;
         
        }
   

});

