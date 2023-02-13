`use strict`;
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

let started = false;

let level = 0;

const playsound = function (name) {
  let audio = new Audio(`/sounds/${name}.mp3`);
  audio.play();
};

$(document).keypress(function () {
  if (!started) {
    $(`#level-title`).text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(`.btn`).click(function () {
  let userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playsound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
  //checkAnswer(userClickPattern.lastIndexOf(userChosenColour));
});

const checkAnswer = function (currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playsound(`wrong`);
    $(`h1`).text(`Game Over, Press Any Key to Restart`);

    $(`body`).addClass(`game-over`);
    setTimeout(function () {
      $(`body`).removeClass(`game-over`);
    }, 200);

    console.log("wrong");

    startOver();
  }
};

const nextSequence = function () {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);

  //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  let randomChosenColour = buttonColours[randomNumber];

  //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playsound(randomChosenColour);
};

// 1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
const animatePress = function (currentColour) {
  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $(`#${currentColour}`).addClass(`pressed`);

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $(`#${currentColour}`).removeClass(`pressed`);
  }, 100);
};
const startOver = function () {
  level = 0;
  gamePattern = [];
  started = false;
};
