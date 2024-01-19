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

// Buttons
const btnReset = getElement(".btn--reset");
const btnRandom = getElement(".btn--random");

// Fetch data
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
      scrambledWord.textContent = scrambledLetters;
      arrangedWord.innerHTML = "";
      for (let i = 0; i < scrambledLetters.length; i++) {
        arrangedWord.insertAdjacentHTML(
          "afterbegin",
          `<input class="letter-box" type="text" maxlength="1" disabled />`
        );
      }

      // Add an event listener to each input box
      const firstInputBox = getElement(".letter-box");
      const inputBoxes = getAllElements(".letter-box");
      firstInputBox.disabled = false;
      firstInputBox.focus();
      let incorrectLetters = [];
      console.log([...inputBoxes]);
      inputBoxes.forEach((input, index, allInputs) => {
        input.addEventListener("input", () => {
          const nextInput = allInputs[index + 1];
          // If the input has a value, move focus to the next input
          if (
            input.value &&
            correctLetters[index] === input.value &&
            index < allInputs.length
          ) {
            if (index + 1 === allInputs.length) {
              alert("You won");
            } else {
              nextInput.disabled = false;
              nextInput.focus();
            }
          } else {
            console.log("wrong letter", input.value);
            incorrectLetters.push(input.value);
            incorrectLettersBox.textContent = incorrectLetters.join(",");
            input.value = "";
            dotNum++;
            [...dots][dotNum - 1].style.backgroundColor = "#7429c6";
            triesCount.textContent = dotNum;
          }
        });

        // Add an event listener to move focus back when the input is cleared
        input.addEventListener("keydown", (e) => {
          if (e.key === "Backspace" && !input.value && index > 0) {
            input.disabled = true;
            allInputs[index - 1].focus();
            allInputs[index - 1].value = "";
          }
        });
      });

      // Check if the input value is correct
    };

    // Initialize the game automatically
    generateScrambledWord();

    btnRandom.addEventListener("click", generateScrambledWord);
  })
  .catch((error) => console.error("Error fetching JSON:", error));

// const parentElement = document.getElementById("parent");

// // Using childNodes
// const childNodes = parentElement.childNodes;
// console.log(childNodes); // Output: 5 (includes text nodes)

// // Using children
// const children = parentElement.children;
// console.log(children); // Output: 2 (only includes
