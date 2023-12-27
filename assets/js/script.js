var pages = ["firstCard", "questionCard", "finalScoreCard"];

// nav elements
var navBar = document.querySelector("nav");
var highScoreNavButton = document.getElementById("high-score-nav");

// first page elements
var startButton = document.getElementById("start-button");

// question page elements
var questionEl = document.getElementById("displayQuestion");
var answerEl = document.getElementById("displayAnswer");
var questionChoiceButtons = document.querySelectorAll(".questionChoice");

// final page elements
var finalScoreValueEl = document.getElementById("final-score-value");
var initialsInput = document.querySelector("#initials");
var submitButton = document.getElementById("submit-button");

// high score page elements
var highScoreEl = document.getElementById("highScoreCard");
var scoreListEl = document.getElementById("score-list");
var backButton = document.getElementById("back-button");
var clearButton = document.getElementById("clear-button");

// question content elements
var questions = ['What does the typeof operator return for null?',
    'What is the result of 3 + 2 + "7" in JavaScript?',
    'Which function is used to parse a string to an integer in JavaScript?',
    'What does the === operator do in JavaScript?',
    'Which keyword is used to declare a constant in JavaScript?'];
var choices = ['object', 'null', 'undefined', 'number',
    '12', '327', '43', '57', 'parseInt()', 'parseFloat()', 'toInteger()', 'stringToNumber()',
    'Checks for value equality without type coercion',
    'Checks for value equality with type coercion',
    'Assigns a value to a variable',
    'Compares two values and returns true if they are different',
    'let', 'var', 'const', 'final'];
var answers = ["a", "d", "a", "a", "c"];
var questionIndex, choiceIndex;

// timer elements
var timerEl = document.getElementById("timer");
var timeLeft = 75;
var timeInterval;

goToNext(0); // set currentPage to first page on load

// Method to navigate to a page based on index
function goToNext(currentIndex) {
    hideAllPages();

    // set & display page
    localStorage.setItem("currentPage", pages[currentIndex]);
    document.getElementById(pages[currentIndex]).style.display = "flex";
}

// Hide all page elements
function hideAllPages() {
    for (let i = 0; i < pages.length; i++) {
        // "none" hides the element
        document.getElementById(pages[i]).style.display = "none";
    }
}

// Starts quiz and timer, & navigate to question page
function startQuiz() {
    // set default values
    questionIndex = 0;
    choiceIndex = 0;

    startCountdown(); // starts timer
    setQuestionContent(); // set first question content

    // move to show questions page
    goToNext(1);
}

// Method to set question & queston choice text content
function setQuestionContent() {
    questionEl.innerHTML = questions[questionIndex];
    // for every question choice set question content
    for (let i = 0; i < questionChoiceButtons.length; i++) {
        questionChoiceButtons[i].innerHTML = choices[choiceIndex];
        choiceIndex++;
    }
}

// Timer that counts down from 75
function startCountdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft;
        timeLeft--;
    }, 1000);
}

// Method to verify answer of question
function verifyAnswer(event) {
    var userInput = event.target.getAttribute("id");
    if (answers[questionIndex] === userInput) {
        displayAnswer.innerHTML = "Correct! :)";
    } else {
        // deduct 10s for wrong answers
        displayAnswer.innerHTML = "Wrong! :(";
        timeLeft -= 10;
    }

    // change question after 1 sec
    setTimeout(changeQuestion, 1000);
}

// Method to show next question text content
function changeQuestion() {
    displayAnswer.innerHTML = "";
    questionIndex++; // increase questionIndex by 1
    setQuestionContent();
    // if questions are all answered
    if (questionIndex == questions.length) {
        // sets current time & final score
        timerEl.textContent = timeLeft;
        finalScoreValueEl.textContent = timeLeft;

        clearInterval(timeInterval); // stops timer
        goToNext(2); // go to final score page
    }
}

// save user initals & score to local storage
function saveInitials(event) {
    event.preventDefault();
    var scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];
    var user = {
        initials: initialsInput.value.trim(),
        score: timeLeft
    };
    scoreList.push(user);

    // add new submission to local storage
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
    initialsInput.value = "";

    timeLeft = 75;
    timerEl.textContent = timeLeft;
    goToNext(0); // go back to first page
}

// Go to high score page & hide every other page
function goToHighScorePage() {
    highScoreEl.style.display = "flex";
    navBar.style.display = "none";
    hideAllPages();

    // get scoreList and sort by descending order
    var scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];
    const orderedList = scoreList.sort((a, b) => a.score - b.score).reverse();
    scoreListEl.innerHTML = orderedList.map(i => `<li>${i.initials} - ${i.score}</li>`).join('');
}

// Go to high score page to page stored in local storage
function goToPreviousPage() {
    highScoreEl.style.display = "none";
    navBar.style.display = "flex";

    var previousPage = localStorage.getItem("currentPage");
    document.getElementById(previousPage).style.display = "flex";
}

// Clear the high score list
function clearHighScoreList() {
    localStorage.removeItem("scoreList");
    goToHighScorePage();
}

/** Click event listeners */
startButton.addEventListener("click", startQuiz);

// loop through each questionChoicec buttons
// and add a click event listener
questionChoiceButtons.forEach(function (button) {
    button.addEventListener("click", verifyAnswer);
});

submitButton.addEventListener("click", saveInitials);

highScoreNavButton.addEventListener("click", goToHighScorePage);
clearButton.addEventListener("click", clearHighScoreList);
backButton.addEventListener("click", goToPreviousPage);