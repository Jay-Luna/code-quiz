var firstPage = document.querySelector(".firstPage");
var boxQuestion = document.querySelector(".boxQuestion");

var startButton = document.querySelector(".start-button");
var question = document.querySelector(".question");
var firstButton = document.querySelector(".first-button");

var questions = ['2', '3', '4', '5'];
var count = 0;

function startQuiz() {
    firstPage.style.display = "none"; 
    boxQuestion.style.display = "flex";
}

// define the function to change the HTML content
function changeQuestion() {
    question.innerHTML = questions[count];
    count++;
    if(count == 4) count = 0;
}


startButton.addEventListener("click", startQuiz);
firstButton.addEventListener("click", changeQuestion);
