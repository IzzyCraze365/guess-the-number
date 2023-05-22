// Project: Week 2
// Guess the Number
// John Isabella III

// TODO This was the code I worked on initally.
// This is before I consolidated the functions, cleaned them up, removing extra comments and console.log statements to check its functionality

 
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promised...\n");
  console.log('You entered: ' + secretNumber);
}
  // Now try and complete the program.
 
//! Global Variable List (before change)
let max = 100;
let min = 1;
let guess = 0;
let i =0;
let userInput = "Start";

// TODO here is where the most of the code should go

while(userInput === "Start"){
  whatIsYourRange();
  whatIsYourMin(); //returns min
  whatIsYourMax(); //returns max
  console.log('Our range has been set from', min,"to",max +".");
  startPhrase(); // Prints Statement
  userInput = "A";
  console.log("userInput =",userInput,"Min =",min,"Max =",max);
  }
 
  //console.log("Function whatIsYourRange test",whatIsYourRange()); //! TEST



while(userInput !== "START"){
while(userInput !== ("Y"||"YES")){
  cpuGuess(min,max); //return guess as a number
  questionGuess(guess); //returns "userInput" Y or N
  if(userInput === ("Y"||"YES")){
    endPhrase(guess); // returns Yes of No
      if(userInput ===("Y"||"YES")){
      min = 1;
      max = 100;
      guess = 0
      i = 0;
      userInput = "START";
     }else{
      console.log("Have a Nice Day!");
      userInput = "EXIT";node 
      break}
  }else if (userInput ===("N"||"NO")){
    questionHighLow()
    if(userInput === "L"){
      numberIsLower(guess); // returns new max
    }else if(userInput === "H"){
      numberIsHigher(guess); // returns new min
    }else{notValid();
    }
  }else{notValid();
}
}
  }



//! Function List (Alphabetical Order)

// Function to fix userInput
function allCaps(userInput){
userInput = userInput.toUpperCase().trim();
return userInput;
}
/* 
let letter= "      x";
console.log("Function allCaps test",allCaps(letter)); //! TEST
 */


//Capitolizes the Player's Name
function firstLetterCaps(name) {
  let firstLetter1 = name.charAt(0).toUpperCase();
  let restOfWord1 = name.slice(1).toLowerCase();
  playerName = firstLetter1 + restOfWord1;
  return playerName;
}
//console.log(firstLetterCaps("yes")); // TEST

// Function for the CPU to provide a Guess
function cpuGuess(min,max){
  if(min===max-1){
    guess = max; //otherwise you can never guess the Max number
    return guess;
  }else{ guess = Math.floor((max+min)/2);
  return guess;
  }
}
/* 
let guess = 0; //! TEST Variable
console.log("Function cpuGuess test",cpuGuess(99,100)); //! TEST
 */


// Function to say a Phrase at the when you guess the correct Number
async function endPhrase(guess){
  console.log(`Your number is ${guess}!`);
  let userInput = await ask(`Would you like to play again? \n Yes (Y) or No (N)?`);
  userInput = allCaps(userInput);
  return userInput;
}
//endPhrase(66); //! Test Print of Phrase


// Function to say a Phrase at the when you guess the correct Number
function notValid(){
  console.log(`Your input "${guess}" is not a valid choice. \n Please choose again.`);
}
/* 
let guess = "J"
notValid(); //! Test Print of Phrase
*/


// Function for when the Player says their number is Higher
function numberIsHigher(guess){
  console.log("Before numberIsHigher function Guess=",guess,"& New Min =",min); //! TEST
  min = guess;
  console.log("After numberIsHigher function Guess=",guess,"& New Min =",min); //! TEST
  return min;
}
/* 
let max = 100; //! TEST Variable
let min = 1; //! TEST Variable
console.log("Function numberIsLower test",numberIsHigher(45)); //! TEST
 */


// Function for when the Player says their number is Lower
function numberIsLower(guess){
  console.log("Before numberIsLower function Guess=",guess,"& New Max =",max); //! TEST
  max = guess;
  console.log("After numberIsLower function Guess=",guess,"& New Max =",max); //! TEST
  return max;
}
/*
let max = 100; //! TEST Variable
let min = 1; //! TEST Variable
console.log("Function numberIsLower test",numberIsLower(5)); //! TEST
 */


// Function to say a Phrase Each Round
async function questionGuess(guess){
  let userInput = await ask(`Is it... ${guess}, \n Yes (Y) or No (N)?`);
  userInput = allCaps(userInput);
  return userInput;
}


// Function to say a Phrase Each Round
function questionHighLow(){
  console.log("Is it higher (H), or lower (L)?")
}
//questionHighLow(); //! Test Print of Phrase


// Function to say a Phrase at the start of the Game
function startPhrase(){
  console.log(`Please think of a number between ${min} and ${max} (inclusive). \n I will try to guess it.`)
}
//startPhrase(); //! Test Print of Phrase


// Function for Player to tell the Range
async function whatIsYourMax() {
  console.log("\n What would you like the largest number in our game to be?");
  let rangeMax = await ask("If your not sure I recommend using the number 100 \n");
    return rangeMax;
  }
  
  async function whatIsYourMin() {
    console.log("\n What would you like the smallest number in our game to be?");
    let rangeMin = await ask("If your not sure I recommend using the number 1 \n"
    );
    return rangeMin;
  }
  whatIsYourMin();


function whatIsYourRange(){
    console.log("First we need to set the Range of Numbers for our game.");
}
//console.log("Function whatIsYourRange test",whatIsYourRange()); //! TEST
