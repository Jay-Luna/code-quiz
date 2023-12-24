var firstPage = document.querySelector(".firstPage");
var startButton = document.querySelector(".start-button");

var boxQuestion = document.querySelector(".boxQuestion");
var question = document.querySelector(".question");

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

function startQuiz() {
    // "none" hides the firstPag
    firstPage.style.display = "none";
    boxQuestion.style.display = "flex";
    question.innerHTML = questions[0];
    aButton.innerHTML = question_choices[questionIndex];
    bButton.innerHTML = question_choices[questionIndex+1];
    cButton.innerHTML = question_choices[questionIndex+2];
    dButton.innerHTML = question_choices[questionIndex+3];
    questionIndex = 4;
}

function goToFinalScore() {
    console.log("goToFinalScore");
}

// define the function to change the HTML content
function changeQuestion() {
    // hide previous answer
    count++;
    question.innerHTML = questions[count];
    aButton.innerHTML = question_choices[questionIndex];
    bButton.innerHTML = question_choices[questionIndex+1];
    cButton.innerHTML = question_choices[questionIndex+2];
    dButton.innerHTML = question_choices[questionIndex+3];
    questionIndex += 4;
    if (count > questions.length) {
        goToFinalScore();
    }
}

// method to verify answer of question
function verifyAnswer(event) {
    event.preventDefault();
    var userInput = event.target.getAttribute("class");

    if (answers[count] === userInput) {
        console.log("isCorrect");
    } else {
        console.log("isWrong");
    }

    // show answer then change questions
    changeQuestion();
}

startButton.addEventListener("click", startQuiz);

aButton.addEventListener("click", verifyAnswer);
bButton.addEventListener("click", verifyAnswer);
cButton.addEventListener("click", verifyAnswer);
dButton.addEventListener("click", verifyAnswer);
