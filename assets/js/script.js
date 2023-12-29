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
var questions = [
    'What does the type of operator return for nullWhat are the 3 ways to select HTML elements with CSS?',
    'What is the result of 3 + 2 + "7" in JavaScript?',
    'Which function is used to parse a string to an integer in JavaScript?',
    'What type of operator is "===" in JavaScript?',
    'Which keyword is used to declare a variable in JavaScript?'];
var choices = [
    'Element selector, class selector and ID selectors.', 'none', 'Property selectors, Value Selectors, and Font Selectors.', 'Selector level 1, selector level 2 and selectors level 3.',
    '12', '327', '43', '57', 
    'parseInt()', 'parseFloat()', 'toInteger()', 'stringToNumber()',
    'both have the same value & type',
    'both do not have the same value & type',
    'both have the same value',
    'both have the same type',
    'let', 'const', 'var', 'final'];
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
    localStorage.setItem("currentPage", currentIndex);
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
        choiceIndex++; // increment by 1
    }
}

// Timer that counts down from 75
function startCountdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft;
        timeLeft--; // minus timeLeft by 1
    }, 1000); // for every 1 sec, execute function
}

// Method to verify answer of question
function verifyAnswer(event) {
    var userInput = event.target.getAttribute("id");
    if (answers[questionIndex] === userInput) {
        displayAnswer.innerHTML = "Correct! 😊";
    } else {
        // deduct 10s for wrong answers
        displayAnswer.innerHTML = "Wrong! 😞";
        timeLeft -= 10;
    }

    // pause for  .65 milli-sec then change question
    setTimeout(changeQuestion, 650);
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

    // reset default values
    initialsInput.value = "";
    timeLeft = 75;
    timerEl.textContent = timeLeft;
    goToNext(0); // go back to first page
}

// Go to high score page & hide every other page
function goToHighScorePage() {
    highScoreEl.style.display = "flex";
    navBar.style.display = "none"; //when display = "none" it hides it
    hideAllPages();

    // get scoreList and sort by descending order
    var scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];
    const descOrderedList = scoreList.sort((a, b) => a.score - b.score).reverse();
    scoreListEl.innerHTML = descOrderedList.map(user => `<li>${user.initials} - ${user.score}</li>`).join('');
    // .map means transforming into another form. array -> join it into string (list of li html)
}

// Go to high score page to page stored in local storage
function goToPreviousPage() {
    highScoreEl.style.display = "none";
    navBar.style.display = "flex";

    var pageIndex = localStorage.getItem("currentPage");
    document.getElementById(pages[pageIndex]).style.display = "flex";
}

// Clear the high score list
function clearHighScoreList() {
    localStorage.removeItem("scoreList");
    scoreListEl.innerHTML = ""; //this resets it to back to an empty string
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