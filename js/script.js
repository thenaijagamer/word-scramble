"use strict";

// Query Selectors
const getElement = (selector) => document.querySelector(selector);
const getAllElements = (selector) => document.querySelectorAll(selector);

// Elements
const scrambledWord = getElement(".card__scrambled-letters");
const arrangedWord = getElement(".card__arranged-letters");
const incorrectLettersBox = getElement(".info__mistake-letters");
const triesCount = getElement(".info__tries-name span");
const dots = getAllElements(".dot");
const loadingElement = document.querySelector(".loader-box");

// Buttons
const btnReset = getElement(".btn--reset");
const btnRandom = getElement(".btn--random");

// Loading functionality
window.addEventListener("load", () => {
  // All web content has finished loading
  setTimeout(() => {
    loadingElement.style.opacity = "0"; // Using opacity because of transition
    setTimeout(() => (loadingElement.style.zIndex = "-1"), 500);
  }, 1000); // Hide loading element
});

// Fetch data once
fetch("./words.json")
  .then((response) => response.json())
  .then((data) => {
    // Game logic
    const generateScrambledWord = () => {
      const words = data.words;
      const randNum = Math.floor(Math.random() * words.length);
      const scrambledLetters = words[randNum].scrambled;
      const correctLetters = words[randNum].correct;
      let dotNum = 0;
      let incorrectLetters = [];
      scrambledWord.textContent = scrambledLetters;

      // Creates the input boxes according to the length of the word
      arrangedWord.innerHTML = "";
      for (let i = 0; i < scrambledLetters.length; i++) {
        arrangedWord.insertAdjacentHTML(
          "afterbegin",
          `<input class="letter-box" type="text" maxlength="1" disabled />`
        );
      }

      // Other Initialization after creating the input boxes element
      const firstInputBox = getElement(".letter-box");
      const inputBoxes = getAllElements(".letter-box");

      // Reset all the records function
      const reset = () => {
        dotNum = 0;
        incorrectLetters = [];
        incorrectLettersBox.textContent = "nil";
        triesCount.textContent = 0;

        dots.forEach((dot) => {
          dot.style.backgroundColor = "#4a5567";
        });
        inputBoxes.forEach((input) => {
          input.value = "";
          input.disabled = true;
        });

        // Go back to the first input after reset
        firstInputBox.disabled = false;
        firstInputBox.focus();
      };
      reset(); // To call reset  when generating random

      // Inputs functionality
      inputBoxes.forEach((input, index, allInputs) => {
        input.addEventListener("input", () => {
          const nextInput = allInputs[index + 1];
          // Make sure all inputs are lower case
          input.value = input.value.toLowerCase();

          // If the input has a value,compare the input value with corrected letter, then move focus to the next input
          if (input.value && input.value === correctLetters[index]) {
            if (index + 1 === allInputs.length) {
              setTimeout(() => {
                alert("You won 👏"); // Building custom alert wastes time
                generateScrambledWord(); // Generate random
              }, 500); // I use settimeout cos of the alert
              allInputs.forEach((input) => {
                input.style.borderColor = "#672171";
              });
            } else {
              input.disabled = true;
              nextInput.disabled = false;
              nextInput.focus();
            }
          } else {
            incorrectLetters.push(input.value);
            incorrectLettersBox.textContent = incorrectLetters.join(",");
            if (dotNum >= 5) {
              reset();
            } else {
              dotNum++;
              [...dots][dotNum - 1].style.backgroundColor = "#7429c6"; // Turn all the dots element to array and change the background color according with index

              triesCount.textContent = dotNum;
            }
            input.value = "";
          }
        });
      });

      // Event handler to reset (It wont work outside this scope)
      btnReset.addEventListener("click", reset);
    };

    // Initialize the game automatically
    generateScrambledWord();

    // Event handler to generate new scrambled Word
    btnRandom.addEventListener("click", generateScrambledWord);
  })
  .catch((error) => console.error("Error fetching JSON:", error));

// Add an event listener to move focus back when the input is cleared
// input.addEventListener("keydown", (e) => {
//   if (e.key === "Backspace" && !input.value && index > 0) {
//     input.disabled = true;
//     allInputs[index - 1].focus();
//     allInputs[index - 1].value = "";
//   }
// });
