// Project: Week 2
// Guess the Number - Reverse Game
// John Isabella III

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
module.exports = reverseGame; // This lets the file link to other JS Files //TODO This is Not Working

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

startReverseGame(); // This is where all the code is for the Reverse Game

async function startReverseGame() {
  console.log(
    `\nLet's play a game where I (computer) make up a number and you (human) try to guess it.\n\n`
  );
  // Now try and complete the program.

  // Global Variable List (default)
  let max = 100;
  let min = 1;
  let maxDummy = 100;
  let minDummy = 1;
  let guess = 0;
  let i = 1; // Keeps track of how many times the CPU made a guess
  let prediction = 0; //This is how many guesses the CPU thinks it needs
  let highLow = "A";
  let toInfinityAnd = "START"; // These keeps the While loop running

  min = await setRangeMinReverse(); //returns min waits for a user response
  max = await setRangeMaxReverse(min); //returns max waits for a user response
  secretNumber = randomNum(min, max); //picks the Secret Number
  maxDummy = max; //This will tell the player if they make a stupid guess
  minDummy = min; // This will tell the player if they made a stupid guess
  console.log(
    `I have selected a "Secret Number between the numbers ${min} and ${max}.\n`
  );
  prediction = wager(min, max);
  console.log(
    `If at any point you want to Quit the game.\nType in "E" or "EXIT"\nGood Luck, Dum Dum\n`
  );

  while (toInfinityAnd !== "Beyond!!!") {
    guess = await humanGuess(i);
    i++;
    dummyCheck(guess, min, max, minDummy, maxDummy, prediction);
    if (guess >= min && guess <= max) {
      if (guess == secretNumber) {
        correctAnswer(i, secretNumber, prediction, minDummy, maxDummy);
        let playAgain = await ask(
          `\nWould you like to play again?\nPlay (P) or Exit (E)?\n`
        );
        playAgain = capitalizeFirstLetter(playAgain);
        nextRound(playAgain);
      } else if (guess > secretNumber) {
        console.log(`The Secret Number is lower than ${guess}.\nTry Again.`);
        max = guess;
      } else if (guess < secretNumber) {
        console.log(`The Secret Number is higher than ${guess}.\nTry Again.`);
        min = guess;
      } else if (guess === "E" || guess === "Exit") {
        quitGame(guess);
      } else {
        notValid(guess);
      }
    } else {
      console.log(`This was a wasted guess...`);
    }
  }

  process.exit();
}

//! Function List (Alphabetical Order)
//Capitolizes the Player's Input
function capitalizeFirstLetter(name) {
  name = name.trim();
  let firstLetter1 = name.charAt(0).toUpperCase();
  let restOfWord1 = name.slice(1).toLowerCase();
  return firstLetter1 + restOfWord1;
}

// This is the function that brings us to the end of the game
function correctAnswer(i, secretNumber, prediction, minDummy, maxDummy) {
  console.log(
    `Congratulations!!!\n\nYou figured out that the Secret Number was ${secretNumber}`
  );
  if (i === 1) {
    console.log(
      `and you figured it out on your FIRST GUESS...\nThat seems a little fishy...\nThere are a lot of numbers between ${minDummy} and ${maxDummy}\nI'm not saying your a cheater...\n but if I had your luck, I'd play the lottery\n(or keep cheating at cards...)\n`
    );
  } else if (i < prediction) {
    let difference = prediction - i;
    console.log(
      `and you figured it out after only ${i} guesses.\nI'm really impressed with you Dum-Dum.\nYou still had ${difference} guess(es) to go.\nI guess from now on I should call you "Smart-Smart"\nBut you will always be Dum-Dum to me.\n`
    );
  } else if ((i = prediction)) {
    console.log(
      `My prediciton came true\nYou figured it out after ${i} guesses.\nGood job, Dum-Dum.\n`
    );
  } else if (i > prediction) {
    console.log(
      `WOW, Dum-Dum\nJust... WOW\nYou figured it out after ${i} guesses.\nYou really earned your nickname.\n(It's "Dum-Dum")\nI feel like I need to remind you because it only should have taken ${prediction} guesses to figure out my Secret Number`
    );
  } else {
    console.log(
      `Something Broke...\nI'm not sure what\nYou are still Dum-Dum\n`
    );
  }
}

//This Function confirms that the player isn't cheating
function doubleCheck(guess, min, max) {
  if (min <= guess && guess <= max) {
    console.log(`\nGood Guess.`);
  } else if (min > guess) {
    console.log(
      `\nThat is a terrible guess!\nYour number (${guess}) should not be lower than ${min}.\nThat is the top of our range.\nDon't you remember?  It wasn't that long ago.\nTry guessing a number above ${min}`
    );
  } else {
    console.log(
      `\nThat is a terrible guess!\nYour number (${guess}) should not be higher than ${max}.\nThat is the top of our range.\nDon't you remember?  It wasn't that long ago.\nTry guessing a number below ${max}`
    );
  }
}

//This checks to see if the player is making stupid guesses
function dummyCheck(guess, min, max, minDummy, maxDummy, prediction) {
  if (minDummy !== min && guess === min) {
    dummyQuote(guess, prediction);
  } else if (maxDummy !== max && guess === max) {
    dummyQuote(guess, prediction);
  } else {
    doubleCheck(guess, min, max);
  }
}

// Function for the program mocking the player
function dummyQuote(guess, prediction) {
  console.log(
    `\nHey Dum-Dum.\nI dont want to tell you how to live your life.\nBut you already guessed ${guess}.\nFar be it from me to tell you how to play the game.\nAll your doing is proving you are not smart enough to guess my Secret Number in ${prediction} guesses.`
  );
}

//This function stores the players guess and makes sure they are not cheating.
async function humanGuess(i) {
  let playerGuess = await ask(`\nThis is Guess #${i}\nPlease pick a number.\n`);
  playerGuess = capitalizeFirstLetter(playerGuess);
  if (isNaN(playerGuess) === false) {
    return playerGuess;
  } else if (playerGuess === "Exit" || playerGuess === "E") {
    quitGame(playerGuess);
  } else {
    console.log(
      `\nNice try\n"${playerGuess}" is NOT a number...\nRestart the game\nAnd trying using Real Numbers next time\n`
    );
    process.exit();
  }
}

// Function that lets the player decide if they want to play again or quit
function nextRound(round2) {
  if (round2 === ("P" || "Play")) {
    startReverseGame(); // TODO This will have to change for the Merged Game
  } else if (round2 === "E" || round2 === "Exit") {
    quitGame(round2);
  } else {
    notValid(round2);
  }
}

// Response for an Invalid Answer response
function notValid(stoopidAnswer) {
  console.log(`\n${stoopidAnswer} is NOT a valid response.\nTry Again\n`);
}

// Function to Generate a Random Number
function randomNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}
//console.log("Function randomNum test",randomNum(1,100)); //! TEST

//Quit the game by typing "Exit"
function quitGame(quit) {
  if (quit === "Exit" || quit === "E");
  console.log("\nI can't wait to Play Again with you!!!\nGOOD BYE\n\n");
  process.exit(); // This ends the Game
}

// Function for Player to set the top of the Range
async function setRangeMaxReverse(min) {
  let rangeMax = await ask(
    `\nWhat would you like the largest number in our game to be?\n(If your not sure I recommend using the number 100)\n`
  );
  rangeMax = setRangeNumberCheck(rangeMax);
  rangeMax = parseInt(rangeMax); // This turns the string, into a number

  if (rangeMax > min) {
    return rangeMax;
  } else {
    console.log(
      `\nSorry, but you need to choose a number that is greater than ${min}\nPlease start the game again.\n\n`
    );
    process.exit();
  }
}

// Function for Player to set the bottom of the Range
async function setRangeMinReverse() {
  let rangeMin = await ask(
    `First we need to set the Range of Numbers for our game.\nWhat would you like the smallest number in our game to be?\n(If your not sure I recommend using the number 1)\n`
  );
  rangeMin = setRangeNumberCheck(rangeMin);
  rangeMin = parseInt(rangeMin); // This turns the string, into a number
  return rangeMin;
}

// Function that Verifies that the input is a Number
function setRangeNumberCheck(notANumber) {
  notANumber = capitalizeFirstLetter(notANumber);
  if (isNaN(notANumber) === false) {
    return notANumber;
  } else if (notANumber === "Exit" || notANumber === "E") {
    quitGame(notANumber);
  } else {
    console.log(
      `\nNice try\n"${notANumber}" is NOT a number...\nRestart the game\nAnd trying using Real Numbers next time\n`
    );
    process.exit();
  }
}

// Function calculates how many guesses it needs to figure out the Secret Number
function wager(min, max) {
  let yogiBear = Math.floor(Math.log2(max - min) + 1);
  console.log(
    `\nIf you are really smart you should be able to figure out what my Secret Number is in less than ${yogiBear} guesses.\nGood luck, Dum-Dum!\n`
  );
  return yogiBear;
}
