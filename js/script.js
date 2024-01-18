"use strict";

// Query Selectors
const getElement = (selector) => document.querySelector(selector);
const getAllElements = (selector) => document.querySelectorAll(selector);

// Elements
const scrambledWord = getElement(".card__scrambled-letters");

// Buttons
const btnReset = getElement(".btn--reset");
const btnRandom = getElement(".btn--random");

// generate scrambled word

// Fetch JSON words data
// Define a global variable to store the cached JSON data
let wordsArr;

// Function to fetch and cache the JSON data
const fetchAndCacheJson = async () => {
  if (!wordsArr) {
    try {
      const response = await fetch("./words.json");
      const data = await response.json();
      wordsArr = data.words;
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }

  return wordsArr;
};

const generateScrambledWord = async () => {
  const words = await fetchAndCacheJson();
  const randNum = Math.floor(Math.random() * words.length);
  const randScrambled = await words[randNum].scrambled;
  scrambledWord.textContent = randScrambled;
};
generateScrambledWord();

btnRandom.addEventListener("click", generateScrambledWord);

// fetch("./words.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const words = data.words;
//     const randNum = Math.floor(Math.random() * words.length);
//     const randScrambled = words[randNum].scrambled;
//     scrambledWord.textContent = randScrambled;
//   })
//   .catch((error) => console.error("Error fetching JSON:", error));

// Get all input elements with the class
const inputBoxes = document.querySelectorAll(".single-char-input");

// Add an event listener to each input box
inputBoxes.forEach((input, index) => {
  input.addEventListener("input", (event) => {
    const currentInput = event.target;
    const nextInput = inputBoxes[index + 1];

    // If the input has a value, move focus to the next input
    if (currentInput.value && nextInput) {
      nextInput.focus();
    }
  });

  // Add an event listener to move focus back when the input is cleared
  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && index > 0) {
      inputBoxes[index - 1].focus();
    }
  });
});
