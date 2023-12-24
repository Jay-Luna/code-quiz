var firstPage = document.querySelector(".firstPage");
var startButton = document.querySelector(".start-button");

var boxQuestion = document.querySelector(".boxQuestion");
var question = document.querySelector(".question");

var aButton = document.querySelector(".a");
var bButton = document.querySelector(".b");
var cButton = document.querySelector(".c");
var dButton = document.querySelector(".d");

var questions = ['1?','2?', '3?', '4?', '5?'];
var answers = ["a" ,"b", "c", "a", "c"];
var count = 0;

function startQuiz() {
    // "none" hides the firstPag
    firstPage.style.display = "none"; 
    boxQuestion.style.display = "flex";
    question.innerHTML = questions[0];
}

function goToFinalScore() {
    console.log("goToFinalScore");
}

// define the function to change the HTML content
function changeQuestion() {
    // hide previous answer
    count++;
    question.innerHTML = questions[count];
    if(count > questions.length) {
        goToFinalScore();
    }
}

// method to verify answer of question
function verifyAnswer(event) {
    event.preventDefault();
    var userInput = event.target.getAttribute("class");

    if(answers[count] === userInput) {
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
