let variants = document.querySelectorAll(".container div[class$=container]");
console.log(variants);

let score = localStorage.getItem("score") ? +localStorage.getItem("score") : 0;

for (let element of variants) {
  element.querySelector(".user-choice").addEventListener("click", choseVariant);
}

// Detect click and hide other variants
let activeItem = "";
function choseVariant(event) {
  for (let element of variants) {
    if (element.querySelector(".user-choice img") !== event.target) {
      element.style.display = "none";
    }
  }
  document.querySelector(".path").style.display = "none";

  activeItem = event.target;
  // console.log(activeItem);
  positionActiveElement();
}

function positionActiveElement() {
  let chosenBlock = activeItem.closest("div[class$=container]");
  console.log(chosenBlock);
  chosenBlock.style.top = "66px";
  chosenBlock.style.left = "-160px";
  chosenBlock.querySelector(".user-choice .icon").style.width = "300px";
  chosenBlock.querySelector(".user-choice").style.width = "300px";
  chosenBlock.querySelector(".computer-choice").style.opacity = "1";

  setTimeout(() => {
    chosenBlock.querySelector(".computer-choice").style.visibility = "visible";
    chosenBlock.querySelector(".computer-choice").style.width = "300px";
    chosenBlock.querySelector(".computer-choice .icon").style.width = "300px";

    chosenBlock.querySelector(".user-choice .choice-label").style.display =
      "block";

    chosenBlock.querySelector(".computer-choice .choice-label").style.display =
      "block";

    setTimeout(() => {
      chosenBlock.style.position = "static";
      document.querySelector(".container .header").style.margin =
        "0 auto 150px";

      chosenBlock.querySelector(".user-choice .choice-label").style.opacity =
        "1";
      chosenBlock.querySelector(
        ".computer-choice .choice-label"
      ).style.opacity = "1";
    }, 400);
  }, 400);

  // Randomizator
  function generateComputerChoice() {
    chosenBlock.querySelector(".result").style.display = "flex";

    let imgArray = [
      "Scissors.svg",
      "Paper.svg",
      "Rock.svg",
      "Lizard.svg",
      "Spock.svg",
    ];

    let itemSrcIndex = -1;
    function getRandomItem() {
      setTimeout(() => {
        function random() {
          let count = Math.floor(Math.random() * (5 - 0) + 1);
          let imgName = imgArray[count - 1];
          if (
            itemSrcIndex == count ||
            chosenBlock.querySelector(".user-choice img").src.includes(imgName)
          ) {
            random();
          } else {
            itemSrcIndex = count;
            console.log(itemSrcIndex);
            chosenBlock.querySelector(".computer-choice img").src = `./src/${
              imgArray[itemSrcIndex - 1]
            }`;
          }
        }
        random();
        setTimeout(() => {
          random();
          setTimeout(() => {
            random();
            setTimeout(() => {
              random();
              setTimeout(() => {
                random();
                setTimeout(() => {
                  random();
                  setTimeout(() => {
                    random();
                    setTimeout(() => {
                      chosenBlock.querySelector(".result").style.opacity = "1";
                      chosenBlock.querySelector(".result").style.width =
                        "224px";
                      checkResult();
                    }, 500);
                  }, 150);
                }, 140);
              }, 130);
            }, 120);
          }, 110);
        }, 100);
      }, 1000);
    }
    getRandomItem();
  }
  generateComputerChoice();

  function checkResult() {
    console.log(chosenBlock.querySelector(".user-choice img").src);
    console.log(chosenBlock.querySelector(".computer-choice img").src);

    chosenBlock.querySelector(".result-text").style.transform = "scale(1)";

    chosenBlock.querySelector(".result-btn").style.position = "relative";
    chosenBlock.querySelector(".result-btn").style.zIndex = "10";

    // User choose Scissors

    if (/Scissors/.test(chosenBlock.querySelector(".user-choice img").src)) {
      if (
        /Lizard/.test(chosenBlock.querySelector(".computer-choice img").src) ||
        /Paper/.test(chosenBlock.querySelector(".computer-choice img").src)
      ) {
        chosenBlock.querySelector(".result-text").innerText = "YOU WIN";
        scoreIncrement();
      } else {
        chosenBlock.querySelector(".result-text").innerText = "YOU LOSE";
        scoreDecrement();
      }
    }

    // User choose Paper

    if (/Paper/.test(chosenBlock.querySelector(".user-choice img").src)) {
      if (
        /Rock/.test(chosenBlock.querySelector(".computer-choice img").src) ||
        /Spock/.test(chosenBlock.querySelector(".computer-choice img").src)
      ) {
        chosenBlock.querySelector(".result-text").innerText = "YOU WIN";
        scoreIncrement();
      } else {
        chosenBlock.querySelector(".result-text").innerText = "YOU LOSE";
        scoreDecrement();
      }
    }

    // User choose Rock

    if (/Rock/.test(chosenBlock.querySelector(".user-choice img").src)) {
      if (
        /Lizard/.test(chosenBlock.querySelector(".computer-choice img").src) ||
        /Scissors/.test(chosenBlock.querySelector(".computer-choice img").src)
      ) {
        chosenBlock.querySelector(".result-text").innerText = "YOU WIN";
        scoreIncrement();
      } else {
        chosenBlock.querySelector(".result-text").innerText = "YOU LOSE";
        scoreDecrement();
      }
    }

    // User choose Lizard

    if (/Lizard/.test(chosenBlock.querySelector(".user-choice img").src)) {
      if (
        /Spock/.test(chosenBlock.querySelector(".computer-choice img").src) ||
        /Paper/.test(chosenBlock.querySelector(".computer-choice img").src)
      ) {
        chosenBlock.querySelector(".result-text").innerText = "YOU WIN";
        scoreIncrement();
      } else {
        chosenBlock.querySelector(".result-text").innerText = "YOU LOSE";
        scoreDecrement();
      }
    }

    // User choose Spock

    if (/Spock/.test(chosenBlock.querySelector(".user-choice img").src)) {
      if (
        /Scissors/.test(
          chosenBlock.querySelector(".computer-choice img").src
        ) ||
        /Rock/.test(chosenBlock.querySelector(".computer-choice img").src)
      ) {
        chosenBlock.querySelector(".result-text").innerText = "YOU WIN";
        scoreIncrement();
      } else {
        chosenBlock.querySelector(".result-text").innerText = "YOU LOSE";
        scoreDecrement();
      }
    }

    function scoreIncrement() {
      score += 1;
      console.log(score);
      localStorage.setItem("score", score);
      document.querySelector(".score").innerText =
        localStorage.getItem("score");
    }

    function scoreDecrement() {
      if (score > 0) {
        score -= 1;
      } else {
        score = 0;
      }

      console.log(score);
      localStorage.setItem("score", score);
      document.querySelector(".score").innerText =
        localStorage.getItem("score");
    }
  }

  chosenBlock.querySelector(".result-btn").addEventListener("click", playAgain);

  function playAgain() {
    chosenBlock.querySelector(".computer-choice").style.transition =
      "all 0.3s ease-out";

    chosenBlock.querySelector(".result").style.opacity = "0";
    chosenBlock.querySelector(".result").style.width = "0";
    chosenBlock.querySelector(".user-choice .choice-label").style.display =
      "none";
    chosenBlock.querySelector(".computer-choice .choice-label").style.display =
      "none";

    setTimeout(() => {
      chosenBlock.querySelector(".computer-choice").style.opacity = "0";
      chosenBlock.style.transition = "all 0s ease-in-out";
      chosenBlock.style.position = "absolute";

      chosenBlock.style.top = "16px";
      console.log(2);
    }, 340);

    // Set initial parameters
    setTimeout(() => {
      chosenBlock.style.transition = "all 0s ease-in-out";

      chosenBlock.querySelector(".user-choice").style.transition =
        "all 0s ease-in-out";

      document.querySelector(".container .header").style.margin =
        "0 auto 100px";

      document.querySelector(".path").style.display = "block";

      chosenBlock.querySelector(".user-choice .icon").style.width = "150px";
      chosenBlock.querySelector(".user-choice").style.width = "150px";

      chosenBlock.querySelector(".computer-choice").style.visibility = "hidden";
      chosenBlock.querySelector(".computer-choice").style.width = "150px";
      chosenBlock.querySelector(".computer-choice .icon").style.width = "150px";

      chosenBlock.querySelector(".user-choice .choice-label").style.opacity =
        "0";

      chosenBlock.querySelector(
        ".computer-choice .choice-label"
      ).style.opacity = "0";

      chosenBlock.querySelector(".result").style.display = "none";

      chosenBlock.querySelector(".result").style.opacity = "0";
      chosenBlock.querySelector(".result").style.width = "0";

      chosenBlock.querySelector(".result-text").style.transform = "scale(0)";

      chosenBlock.querySelector(".result-btn").style.position = "static";
      // chosenBlock.querySelector(".result-btn").style.zIndex = "10";

      chosenBlock.style.transition = "all 0.4s ease-in-out";
      chosenBlock.querySelector(".user-choice").style.transition =
        "all 0.4s ease-in-out";

      //Reset scissors style
      document.querySelector(
        ".play-field-wrapper .scissors-container"
      ).style.top = "-60px";
      document.querySelector(
        ".play-field-wrapper .scissors-container"
      ).style.left = "96px";

      //Reset paper style
      document.querySelector(".play-field-wrapper .paper-container").style.top =
        "64px";
      document.querySelector(
        ".play-field-wrapper .paper-container"
      ).style.left = "260px";

      //Reset rock style

      document.querySelector(".play-field-wrapper .rock-container").style.top =
        "248px";
      document.querySelector(".play-field-wrapper .rock-container").style.left =
        "195px";

      //Reset lizard style

      document.querySelector(
        ".play-field-wrapper .lizard-container"
      ).style.top = "248px";
      document.querySelector(
        ".play-field-wrapper .lizard-container"
      ).style.left = "0";

      //Reset spock style

      document.querySelector(".play-field-wrapper .spock-container").style.top =
        "64px";
      document.querySelector(
        ".play-field-wrapper .spock-container"
      ).style.left = "-66px";

      for (let element of variants) {
        element.style.display = "";
      }
    }, 500);
  }
}

// Rules
document.querySelector(".rules-btn").addEventListener("click", showRules);
document.querySelector(".rules").addEventListener("click", hideRules);
document.querySelector(".close-top").addEventListener("click", hideRules);
document.querySelector(".close-bottom").addEventListener("click", hideRules);

function showRules() {
  document.querySelector(".rules").style.display = "flex";
  setTimeout(() => {
    document.querySelector(".rules-wrapper").style.transform = "translateY(0)";
  }, 100);
}
function hideRules() {
  document.querySelector(".rules-wrapper").style.transform = "translateY(200%)";
  setTimeout(() => {
    document.querySelector(".rules").style.display = "none";
  }, 400);
}
