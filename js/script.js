"use strict";

// Query Selectors
const getElement = (selector) => document.querySelector(selector);
const getAllElements = (selector) => document.querySelectorAll(selector);

// Elements
const scrambledWord = getElement(".card__scrambled-letters");

// Fetch JSON words data
let words;
fetch("./words.json")
  .then((response) => response.json())
  .then((data) => {
    words = data.words;
    console.log(words);
  })
  .catch((error) => console.error("Error fetching JSON:", error));

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
