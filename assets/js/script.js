var highScoreLink = document.getElementById("high-score-link");
var firstPage = document.querySelector(".firstPage");
var startButton = document.querySelector(".start-button");

var boxQuestion = document.querySelector(".boxQuestion");
var question = document.querySelector(".question");
var displayAnswer = document.querySelector(".displayAnswer");

var aButton = document.querySelector(".a");
var bButton = document.querySelector(".b");
var cButton = document.querySelector(".c");
var dButton = document.querySelector(".d");

var questions = ['What does the typeof operator return for null?',
    'What is the result of 3 + 2 + "7" in JavaScript?',
    'Which function is used to parse a string to an integer in JavaScript?',
    'What does the === operator do in JavaScript?',
    'Which keyword is used to declare a constant in JavaScript?'];
var question_choices = ['object', 'null', 'undefined', 'number',
    '12', '327', '43', '57', 'parseInt()', 'parseFloat()', 'toInteger()', 'stringToNumber()',
    'Checks for value equality without type coercion',
    'Checks for value equality with type coercion',
    'Assigns a value to a variable',
    'Compares two values and returns true if they are different',
    'let', 'var', 'const', 'final'];

var answers = ["a", "d", "a", "a", "c"];
var count = 0;
var questionIndex = 0;

var timerEl = document.getElementById("timer");
var timeLeft = 75;
var timeInterval;

var finalScoreEl = document.querySelector(".finalScore");
var finalScoreValueEl = document.getElementById("final-score-value");

var highScorePage = document.querySelector(".highScore");

// Timer that counts down from 75
function countdown() {  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 0) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent =+ timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = timeLeft;
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        goToFinalScorePage();
      }
    }, 1000);
  }

function startQuiz() {
    countdown();
    // "none" hides the firstPage
    firstPage.style.display = "none";
    boxQuestion.style.display = "flex";
    question.innerHTML = questions[0];
    aButton.innerHTML = question_choices[questionIndex];
    bButton.innerHTML = question_choices[questionIndex + 1];
    cButton.innerHTML = question_choices[questionIndex + 2];
    dButton.innerHTML = question_choices[questionIndex + 3];
    questionIndex = 4;
}

// go to high score page  & hide every other page
function goToHighScorePage() {
    console.log("goToHighScore");
    highScorePage.style.display = "flex";
    firstPage.style.display = "none";
    boxQuestion.style.display = "none";
    finalScoreEl.style.display = "none";
}

// hide question box
function goToFinalScorePage() {
    console.log("goToFinalScore");
    finalScoreValueEl.textContent = timeLeft;
    boxQuestion.style.display = "none";
    finalScoreEl.style.display = "flex";
}

// define the function to change the HTML content
function changeQuestion() {
    // hide previous answer
    count++;
    question.innerHTML = questions[count];
    aButton.innerHTML = question_choices[questionIndex];
    bButton.innerHTML = question_choices[questionIndex + 1];
    cButton.innerHTML = question_choices[questionIndex + 2];
    dButton.innerHTML = question_choices[questionIndex + 3];
    questionIndex += 4;
    if (count == questions.length) {
        clearInterval(timeInterval);
        goToFinalScorePage();
    }
}

// method to verify answer of question
function verifyAnswer(event) {
    event.preventDefault();
    var userInput = event.target.getAttribute("class");

    if (answers[count] === userInput) {
        // displayAnswer.innerHTML = "Correct!"
        console.log("isCorrect");
    } else {
        // displayAnswer.innerHTML = "Wrong. :("
        console.log("isWrong");
        timeLeft -= 10;
    }

    // show answer then change questions
    changeQuestion();
}

startButton.addEventListener("click", startQuiz);

aButton.addEventListener("click", verifyAnswer);
bButton.addEventListener("click", verifyAnswer);
cButton.addEventListener("click", verifyAnswer);
dButton.addEventListener("click", verifyAnswer);

highScoreLink.addEventListener("click", goToHighScorePage);