//Set initial score
let score = localStorage.getItem("score") ? +localStorage.getItem("score") : 0;

document.querySelector(".score").innerText = score;

//Find all items and add click listeners
let variants = document.querySelectorAll(".container div[class$=container]");
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
  playRound();
}

function playRound() {
  let chosenBlock = activeItem.closest("div[class$=container]");

  if (window.innerWidth < 500) {
    // Mobile (Change position settings and making chosen item bigger) -->
    document.querySelector(".container .header").style.margin = "0 auto 130px";
    chosenBlock.querySelector(".computer-choice").style.display = "flex";
    chosenBlock.style.position = "static";
    chosenBlock.querySelector(".user-choice .icon").style.width = "150px";
    chosenBlock.querySelector(".user-choice").style.width = "150px";
    chosenBlock.style.flexDirection = "column";
    chosenBlock.style.justifyContent = "space-between";
    chosenBlock.style.padding = "90px 0 80px";
    // <-- Mobile
  } else {
    // Desktop -->
    chosenBlock.querySelector(".computer-choice").style.display = "flex";
    chosenBlock.style.top = "66px";
    chosenBlock.style.left = "-160px";
    chosenBlock.querySelector(".user-choice .icon").style.width = "300px";
    chosenBlock.querySelector(".user-choice").style.width = "300px";
    // Desktop <--
  }

  chosenBlock.querySelector(".computer-choice").style.opacity = "1";

  setTimeout(() => {
    chosenBlock.querySelector(".computer-choice").style.visibility = "visible";

    if (window.innerWidth < 500) {
      // Mobile -->
      chosenBlock.querySelector(".computer-choice").style.width = "150px";
      chosenBlock.querySelector(".computer-choice .icon").style.width = "150px";
      // <-- Mobile
    } else {
      // Desktop -->
      chosenBlock.querySelector(".computer-choice").style.width = "300px";
      chosenBlock.querySelector(".computer-choice .icon").style.width = "300px";
      // Desktop <--
    }

    chosenBlock.querySelector(".user-choice .choice-label").style.display =
      "block";

    chosenBlock.querySelector(".computer-choice .choice-label").style.display =
      "block";

    setTimeout(() => {
      chosenBlock.style.position = "static";

      if (window.innerWidth > 500) {
        // Desktop -->
        document.querySelector(".container .header").style.margin =
          "0 auto 150px";
        // <-- Desktop
      }

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
          let count = Math.floor(Math.random() * 5 + 1);
          let imgName = imgArray[count - 1];
          if (
            itemSrcIndex == count ||
            chosenBlock.querySelector(".user-choice img").src.includes(imgName)
          ) {
            random();
          } else {
            itemSrcIndex = count;

            chosenBlock.querySelector(".computer-choice img").src = `./src/${
              imgArray[itemSrcIndex - 1]
            }`;
          }
        }

        // Slides animation -->
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
                      if (window.innerWidth < 500) {
                        chosenBlock.querySelector(".result").style.height =
                          "110px";
                      }
                      // Animation end and compare user option and generated option
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
    chosenBlock.querySelector(".result-text").style.transform = "scale(1)";

    chosenBlock.querySelector(".result-btn").style.position = "relative";
    chosenBlock.querySelector(".result-btn").style.zIndex = "10";

    let userImgAdress = chosenBlock
      .querySelector(".user-choice img")
      .src.split("/");
    let userChoice = userImgAdress[userImgAdress.length - 1];

    let computerImgAdress = chosenBlock
      .querySelector(".computer-choice img")
      .src.split("/");
    let computerChoice = computerImgAdress[computerImgAdress.length - 1];

    // User choose Scissors

    if (/Scissors/.test(userChoice)) {
      if (/Lizard/.test(computerChoice) || /Paper/.test(computerChoice)) {
        chosenBlock.querySelector(".result-text").innerText = "YOU WIN";
        scoreIncrement();
      } else {
        chosenBlock.querySelector(".result-text").innerText = "YOU LOSE";
        scoreDecrement();
      }
    }

    // User choose Paper
    else if (/Paper/.test(userChoice)) {
      if (/Rock/.test(computerChoice) || /Spock/.test(computerChoice)) {
        chosenBlock.querySelector(".result-text").innerText = "YOU WIN";
        scoreIncrement();
      } else {
        chosenBlock.querySelector(".result-text").innerText = "YOU LOSE";
        scoreDecrement();
      }
    }

    // User choose Rock
    else if (/Rock/.test(userChoice)) {
      if (/Lizard/.test(computerChoice) || /Scissors/.test(computerChoice)) {
        chosenBlock.querySelector(".result-text").innerText = "YOU WIN";
        scoreIncrement();
      } else {
        chosenBlock.querySelector(".result-text").innerText = "YOU LOSE";
        scoreDecrement();
      }
    }

    // User choose Lizard
    else if (/Lizard/.test(userChoice)) {
      if (/Spock/.test(computerChoice) || /Paper/.test(computerChoice)) {
        chosenBlock.querySelector(".result-text").innerText = "YOU WIN";
        scoreIncrement();
      } else {
        chosenBlock.querySelector(".result-text").innerText = "YOU LOSE";
        scoreDecrement();
      }
    }

    // User choose Spock
    else if (/Spock/.test(userChoice)) {
      if (/Scissors/.test(computerChoice) || /Rock/.test(computerChoice)) {
        chosenBlock.querySelector(".result-text").innerText = "YOU WIN";
        scoreIncrement();
      } else {
        chosenBlock.querySelector(".result-text").innerText = "YOU LOSE";
        scoreDecrement();
      }
    }

    function scoreIncrement() {
      score += 1;
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
    if (window.innerWidth < 500) {
      chosenBlock.querySelector(".result").style.height = "0";
    }

    chosenBlock.querySelector(".user-choice .choice-label").style.display =
      "none";
    chosenBlock.querySelector(".computer-choice .choice-label").style.display =
      "none";

    setTimeout(() => {
      chosenBlock.querySelector(".computer-choice").style.opacity = "0";
      chosenBlock.style.transition = "all 0s ease-in-out";
      chosenBlock.style.position = "absolute";

      if (window.innerWidth < 500) {
        document.querySelector(".container .header").style.margin =
          "0 auto 20px";
        chosenBlock.style.top = "5px";
        chosenBlock.style.left = "96px";
      } else {
        chosenBlock.style.top = "16px";
      }
    }, 340);

    // Set initial parameters
    setTimeout(() => {
      chosenBlock.style.transition = "all 0s ease-in-out";

      chosenBlock.querySelector(".user-choice").style.transition =
        "all 0s ease-in-out";

      document.querySelector(".path").style.display = "block";

      chosenBlock.querySelector(".computer-choice").style.visibility = "hidden";

      chosenBlock.querySelector(".result").style.display = "none";

      if (window.innerWidth < 500) {
        chosenBlock.querySelector(".computer-choice").style.width = "105px";
        chosenBlock.querySelector(".computer-choice .icon").style.width =
          "105px";
        chosenBlock.querySelector(".user-choice .icon").style.width = "105px";
        chosenBlock.querySelector(".user-choice").style.width = "105px";
      } else {
        document.querySelector(".container .header").style.margin =
          "0 auto 100px";

        chosenBlock.querySelector(".user-choice .icon").style.width = "150px";
        chosenBlock.querySelector(".user-choice").style.width = "150px";

        chosenBlock.querySelector(".computer-choice").style.width = "150px";
        chosenBlock.querySelector(".computer-choice .icon").style.width =
          "150px";
      }

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

      chosenBlock.style.transition = "all 0.4s ease-in-out";
      chosenBlock.querySelector(".user-choice").style.transition =
        "all 0.4s ease-in-out";

      //Reset scissors style

      if (window.innerWidth < 500) {
        document.querySelector(
          ".play-field-wrapper .scissors-container"
        ).style.padding = "0";

        document.querySelector(
          ".play-field-wrapper .scissors-container"
        ).style.top = "20px";
        document.querySelector(
          ".play-field-wrapper .scissors-container"
        ).style.left = "119px";

        document.querySelector(
          ".play-field-wrapper .scissors-container .computer-choice"
        ).style.display = "none";
      } else {
        document.querySelector(
          ".play-field-wrapper .scissors-container"
        ).style.top = "-60px";
        document.querySelector(
          ".play-field-wrapper .scissors-container"
        ).style.left = "96px";
      }

      //Reset paper style
      if (window.innerWidth < 500) {
        document.querySelector(
          ".play-field-wrapper .paper-container"
        ).style.padding = "0";
        document.querySelector(
          ".play-field-wrapper .paper-container"
        ).style.top = "95px";
        document.querySelector(
          ".play-field-wrapper .paper-container"
        ).style.left = "227px";

        document.querySelector(
          ".play-field-wrapper .paper-container .computer-choice"
        ).style.display = "none";
      } else {
        document.querySelector(
          ".play-field-wrapper .paper-container"
        ).style.top = "64px";
        document.querySelector(
          ".play-field-wrapper .paper-container"
        ).style.left = "260px";
      }

      //Reset rock style
      if (window.innerWidth < 500) {
        document.querySelector(
          ".play-field-wrapper .rock-container"
        ).style.padding = "0";
        document.querySelector(
          ".play-field-wrapper .rock-container"
        ).style.top = "220px";
        document.querySelector(
          ".play-field-wrapper .rock-container"
        ).style.left = "197px";

        document.querySelector(
          ".play-field-wrapper .rock-container .computer-choice"
        ).style.display = "none";
      } else {
        document.querySelector(
          ".play-field-wrapper .rock-container"
        ).style.top = "248px";
        document.querySelector(
          ".play-field-wrapper .rock-container"
        ).style.left = "195px";
      }

      //Reset lizard style
      if (window.innerWidth < 500) {
        document.querySelector(
          ".play-field-wrapper .lizard-container"
        ).style.padding = "0";
        document.querySelector(
          ".play-field-wrapper .lizard-container"
        ).style.top = "220px";
        document.querySelector(
          ".play-field-wrapper .lizard-container"
        ).style.left = "44px";

        document.querySelector(
          ".play-field-wrapper .lizard-container .computer-choice"
        ).style.display = "none";
      } else {
        document.querySelector(
          ".play-field-wrapper .lizard-container"
        ).style.top = "248px";
        document.querySelector(
          ".play-field-wrapper .lizard-container"
        ).style.left = "0";
      }

      //Reset spock style
      if (window.innerWidth < 500) {
        document.querySelector(
          ".play-field-wrapper .spock-container"
        ).style.padding = "0";
        document.querySelector(
          ".play-field-wrapper .spock-container"
        ).style.top = "95px";
        document.querySelector(
          ".play-field-wrapper .spock-container"
        ).style.left = "14px";

        document.querySelector(
          ".play-field-wrapper .spock-container .computer-choice"
        ).style.display = "none";
      } else {
        document.querySelector(
          ".play-field-wrapper .spock-container"
        ).style.top = "64px";
        document.querySelector(
          ".play-field-wrapper .spock-container"
        ).style.left = "-66px";
      }

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
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";
  document.body.style.maxHeight = "100vh";

  setTimeout(() => {
    document.querySelector(".rules").style.display = "flex";
    setTimeout(() => {
      document.querySelector(".rules-wrapper").style.transform =
        "translateY(0)";
    }, 400);
  }, 500);
}
function hideRules() {
  document.body.style.overflow = "visible";
  document.querySelector(".rules-wrapper").style.transform = "translateY(200%)";
  setTimeout(() => {
    document.querySelector(".rules").style.display = "none";
  }, 400);
}
